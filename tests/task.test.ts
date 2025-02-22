import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import Task from '../src/models/Task';

describe('Task API', () => {
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date().toISOString()
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe(taskData.status);
      expect(response.body.priority).toBe(taskData.priority);
    });

    it('should validate task input', async () => {
      const invalidTask = {
        title: 'Te', // Trop court
        description: 'Short', // Trop court
        status: 'INVALID', // Status invalide
        priority: 'LOW' // OK
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.message).toBeDefined();
      expect(typeof response.body.message).toBe('string');
    });

    it('should reject empty task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await Task.create([
        {
          title: 'Task 1',
          description: 'Description 1',
          status: 'TODO',
          priority: 'HIGH'
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          status: 'IN_PROGRESS',
          priority: 'MEDIUM'
        }
      ]);
    });

    it('should return all tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBeDefined();
      expect(response.body[0].status).toBeDefined();
    });

    it('should return empty array when no tasks exist', async () => {
      await Task.deleteMany({});
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'TODO',
        priority: 'MEDIUM'
      });

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .expect(200);

      expect(response.body.title).toBe(task.title);
      expect(response.body.description).toBe(task.description);
      expect(response.body.status).toBe(task.status);
      expect(response.body.priority).toBe(task.priority);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(response.body.message).toBeDefined();
    });
  });
});