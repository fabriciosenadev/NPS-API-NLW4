import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../respositories/SurveysUsersRepository";

class AnswerControler {
    // http://localhost:3333/answers/8?u=fe74fb3e-53dd-418d-9e20-b1aa643602f7
    /**
     * Route Params => this are paramsters that a route contains 
     * routes.get("/answers/:value")
     *  
     * Query PArams => contais a ? interrogation sign in format key=value
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({ 
            id: String(u) 
        })

        if(!surveyUser){
            //changing return with error to a exception
            throw new AppError("Survey User does not exists!");
            // return response.status(400).json({
            //     error: "Survey User does not exists!"
            // })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerControler }