import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../respositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        //#region  validation using yup package

        const schema = yup.object().shape({
            name: yup.string().required("Name is required").min(3, "minimum lenght 3"),
            email: yup.string().email("must be valid").required()
        });

        // option 1
        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({
        //         error: "Validation failed!"
        //     });
        // }

        // option 2 -- BETTER
        try {
            // { abortEarly: false } -> continue execution to validate all instead of cut execution
            await schema.validate(request.body, { abortEarly: false });
        }
        catch (err) {
            throw new AppError("User already exists!");
            // return response.status(400).json({
            //     error: err
            // });
        }

        //#endregion

        // use repository trougth typeorm and aply model to this repository
        const userRepository = getCustomRepository(UserRepository);

        //verify if already exists
        // SELEC * FROM USERS WHERE EMAIL = EMAIL
        const userAlreadyExists = await userRepository.findOne({
            email
        });
        if (userAlreadyExists) {
            // pattern of JS
            // throw new Error();
            throw new AppError("User already exists!");
            // return response.status(400).send({
            //     error: "User already exists!",
            // });
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
