import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (req, res) => {
  res.send('API Gestion des Tâches');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;