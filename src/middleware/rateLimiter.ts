import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: {
    error: {
      message: 'Trop de requêtes, veuillez réessayer plus tard.',
      code: 'RATE_LIMIT_EXCEEDED',
      status: 429
    }
  },
  standardHeaders: true, // Retourne les headers `RateLimit-*`
  legacyHeaders: false // Désactive les headers `X-RateLimit-*`
});