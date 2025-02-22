import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Récupère toutes les tâches
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Liste des tâches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Crée une nouvelle tâche
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tâche créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get('/', (req, res) => taskController.getAllTasks(req, res));
router.post('/', (req, res) => taskController.createTask(req, res));

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Récupère une tâche par son ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La tâche trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
// ... autres routes avec documentation similaire

// Utilisez des fonctions fléchées pour préserver le contexte
router.post('/', (req, res) => taskController.createTask(req, res));
router.get('/', (req, res) => taskController.getAllTasks(req, res));
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));
// Ajouter ces nouvelles routes
router.get('/status/:status', (req, res) => taskController.getTasksByStatus(req, res));
router.get('/overdue', (req, res) => taskController.getOverdueTasks(req, res));

export default router;