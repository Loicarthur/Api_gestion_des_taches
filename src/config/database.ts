import mongoose from 'mongoose';
/**
 * Configuration de la connexion à MongoDB
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} Si la connexion échoue
 */
export const connectDB = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };