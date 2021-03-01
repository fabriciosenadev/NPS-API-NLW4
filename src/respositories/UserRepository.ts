import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

// inherit Repository from typeorm and is necessary to declare entity from models 
@EntityRepository(User) // declare usign a decorator that all this is a respository
class UserRepository extends Repository<User> {

}

export { UserRepository };