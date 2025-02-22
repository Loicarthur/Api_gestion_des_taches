import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import { validateTaskInput } from './middleware/validateRequest';

dotenv.config();

// Initialisation de l'application
const app: Express = express();
const port = process.env.PORT || 3000;
// Middleware de base 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(apiLimiter);


// Routes et validation
app.use('/api/tasks', validateTaskInput, taskRoutes);
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


// Gestionnaire d'erreurs global
app.use(errorHandler);



// Base route
app.get('/', (req, res) => {
  res.send('API Gestion des Tâches');
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});

export default app;