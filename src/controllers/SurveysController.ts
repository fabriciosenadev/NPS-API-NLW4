import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../respositories/SurveysRepository';

class SurveysController {
    async create(request: Request, response: Response){
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });
        await surveysRepository.save(survey);

        // status 201 = create
        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response){
        const surveysRepository = getCustomRepository(SurveysRepository);

        // find search all registers
        const all = await surveysRepository.find();

        return response.json(all);
    }
}

export { SurveysController };
