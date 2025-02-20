import { UserController } from '../controllers/user.controller.js';

export default class UserRoutes {

    async routes(fastify, options) {
        fastify.post('/users', async (req, reply) => {
            const userController = new UserController();
            await userController.createUser(req, reply);
        });

        // Rota para upload de imagem de perfil
        fastify.post('/users/:userId/upload', async (req, reply) => {
            const userController = new UserController();
            await userController.uploadProfileImage(req, reply);
        });
    }
    
}