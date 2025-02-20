import { UserService } from '../services/user.service.js';

export class UserController {
    
    async createUser(req, reply) {
        const file = await req.file();
        const name = "Leal 2";
        
        try {
            const userService = new UserService();
            const user = await userService.createNewUser(name, file);
            reply.code(201).send({ success: true, user });
        } catch (error) {
            reply.code(400).send({ success: false, error: error.message });
        }
    }
}