import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface IAutenticateRequest {
  email: string;
  password: string; 
}

class AuthenticateUserService {

  async excute({email, password} : IAutenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if(!user) {
      throw new Error('Email or Password incorrect');
    }

    //Verificar senha informada
    const passwordValidate = await compare(password, user.password);

    if(!passwordValidate) {
      throw new Error('Email or Password incorrect');
    }

    //Gerar token JWT
    const token = sign({
      email: user.email
    }, 
    "72fec2f4c6a9c5fc07d8764f5b46a717", 
    {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;

  }

}

export { AuthenticateUserService };