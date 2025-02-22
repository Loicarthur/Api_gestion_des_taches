import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestion des Tâches',
      version: '1.0.0',
      description: 'API RESTful pour la gestion des tâches',
      contact: {
        name: 'Support API',
        email: 'support@api-tasks.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique de la tâche'
            },
            title: {
              type: 'string',
              description: 'Titre de la tâche'
            },
            description: {
              type: 'string',
              description: 'Description détaillée de la tâche'
            },
            status: {
              type: 'string',
              enum: ['TODO', 'IN_PROGRESS', 'DONE'],
              description: 'Statut de la tâche'
            },
            priority: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH'],
              description: 'Priorité de la tâche'
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date d\'échéance de la tâche'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string'
                },
                code: {
                  type: 'string'
                },
                status: {
                  type: 'number'
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const specs = swaggerJsdoc(options);