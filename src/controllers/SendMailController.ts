import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../respositories/SurveysRepository";
import { SurveysUsersRepository } from "../respositories/SurveysUsersRepository";
import { UserRepository } from "../respositories/UserRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';
import { AppError } from "../errors/AppError";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new AppError("User does not exists");
            // return response.status(400).json({
            //     error: "User does not exists",
            // });
        }

        const survey = await surveyRepository.findOne({
            id: survey_id
        })

        if (!survey) {
            throw new AppError("Survey does not exists");
            // return response.status(400).json({
            //     error: "Survey does not exists",
            // });
        }

        // __dirname get exact path from where you file is
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            //where: [{ user_id: user.id }, { value: null }], // <- or condition
            where: { user_id: user.id, value: null }, // <- and condition
            relations: ["user", "survey"] // include all relationed data - optional
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        };

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        // save data into table surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser);
        variables.id = surveyUser.id;
        // send email to user 
        await SendMailService.execute(email, survey.title, variables, npsPath)

        return response.json(surveyUser);
    }
}

export { SendMailController }