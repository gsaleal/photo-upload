import { randomUUID } from "crypto";
import { sql } from "../config/db.js";

export class UserRepository {
    #user = new Map();

    async list() {
        return await sql`select * from users`;
    }

    async create(user) {
        const { name } = user;
        const userId = randomUUID();
        console.log('user: ' + user);
        await sql`insert into users (id, name) values(${userId}, ${user})`;
        return userId;
    }

    async updateUserPhoto(userId, imageUrl) {
        await sql`UPDATE users SET profile_image_url = ${imageUrl} WHERE id = ${userId}`;
    }
}
