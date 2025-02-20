import { S3 } from "../config/s3.js";
import { UserRepository } from '../repositories/user.repository.js';
import sharp from "sharp";

export class UserService {

    async createNewUser(name, image = '') {
        if (!name || name.trim() === '') {
            throw new Error('Invalid user name');
        }

        const database = new UserRepository();
        
        const userId = await database.create(name);
        await this.uploadUserProfileImage(userId, image);
        return userId;
    }

    async getUploadToS3Configuration(fileName, file) {

        const compressedImage = sharp(file)
        .resize({width: 100, height: 100})
        .toBuffer();

        return {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName, 
            Body: compressedImage,
            ContentType: file.mimetype 
        }

        /*
        const fileContent = Buffer.from(await file.toBuffer(), 'binary');
        return {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName, 
            Body: fileContent,
            ContentType: file.mimetype 
        }*/
    }

    async updateImageUrl(userId, data) {
        const uploadResult = data;
        const imageUrl = uploadResult.Location;
        const database = new UserRepository();
        await database.updateUserPhoto(userId, imageUrl);
        console.log('imageUrl: ' + imageUrl);
    }

    async uploadUserProfileImage(userId, file) {
        if (file) {
            try {
                const s3 = await new S3().connect();
                const params = await this.getUploadToS3Configuration(`${userId}/${file.filename}`, file);
                s3.upload(params, async (error, data) => {
                    if(error) {
                        console.log(`An error ocurred while trying to upload: ${error}`);
                        throw new Error(`Error while updating image to S3 Bucket: ${error}`);
                    }
                    
                    console.log(`Image sucessfully uploaded to S3 Bucket! Check your AWS Console to check it out!`);
                    await updateImageUrl(userId, data);
                    
                    return imageUrl;
                })
            } catch (error) {
                console.error('Error uploading to S3:', error);
                throw new Error('Failed to upload image');
            }
        } else {
            console.log('Image not found');
        }
    }
}
