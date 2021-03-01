import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

// inherit Repository from typeorm and is necessary to declare entity from models 
@EntityRepository(Survey) // declare usign a decorator that all this is a respository
class SurveysRepository extends Repository<Survey> {

}

export { SurveysRepository };