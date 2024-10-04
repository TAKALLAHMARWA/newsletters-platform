import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API de votre projet',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *         - title
 *       properties:
 *         userId:
 *           type: string
 *           description: L'ID de l'utilisateur qui a créé le blog
 *         content:
 *           type: string
 *           description: Contenu du blog
 *         title:
 *           type: string
 *           description: Titre du blog
 *         image:
 *           type: string
 *           description: URL de l'image associée au blog
 *         category:
 *           type: string
 *           description: Catégorie du blog
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         profilePicture:
 *           type: string
 *           description: URL de l'image de profil de l'utilisateur
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       required:
 *         - email
 *         - status
 *       properties:
 *         email:
 *           type: string
 *           description: Email de l'abonné
 *         source:
 *           type: string
 *           description: Source par laquelle l'abonné a été ajouté
 *         status:
 *           type: string
 *           description: Statut de l'abonnement (actif, inactif, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *         - createdAt
 *       properties:
 *         userId:
 *           type: string
 *           description: ID de l'utilisateur qui a posté le commentaire
 *         content:
 *           type: string
 *           description: Contenu du commentaire
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date et heure de création du commentaire
 *         postId:
 *           type: string
 *           description: ID du poste auquel le commentaire est associé
 */
 /**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - newsLetterOwnerId
 *       properties:
 *         title:
 *           type: string
 *           description: Titre de la newsletter
 *         content:
 *           type: string
 *           description: Contenu de la newsletter
 *         newsLetterOwnerId:
 *           type: string
 *           description: ID du propriétaire de la newsletter
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date et heure de création de la newsletter
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la dernière mise à jour de la newsletter
 */

