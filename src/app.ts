import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import { validateTaskInput } from './middleware/validateRequest';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

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

// Gestionnaire d'erreurs global
app.use(errorHandler);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Démarrer le serveur uniquement si ce fichier est exécuté directement
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
}

export default app;