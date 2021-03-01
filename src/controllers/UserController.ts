import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../respositories/UserRepository';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        // use repository trougth typeorm and aply model to this repository
        const userRepository = getCustomRepository(UserRepository);

        //verify if already exists
        // SELEC * FROM USERS WHERE EMAIL = EMAIL
        const userAlreadyExists = await userRepository.findOne({
            email
        });
        if (userAlreadyExists) {
            return response.status(400).send({
                error: "User already exists!",
            });
        }

        // apply value to a creation 
        const user = userRepository.create({
            name, email
        });
        // effective the record in database
        await userRepository.save(user);

        return response.status(201).json(user)
    }
}

export { UserController };
