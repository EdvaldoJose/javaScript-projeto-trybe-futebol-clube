import { compare } from 'bcryptjs';
import IUser from '../interface/IUser';
import generationToken from '../utils/JWT';
import IUserCredential from '../interface/IUserCredential';
import Users from '../database/models/UsersModel';
import CustomError from '../utils/statusError';

export default class LoginService {
  constructor(private model = Users) { }

  async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ where: { email } });

    return user as IUser;
  }

  async login(userCredential: IUserCredential): Promise<string> {
    const { email, password } = userCredential;

    const checkUserExist = await this.findUserByEmail(email);
    if (!checkUserExist) {
      throw new CustomError('Invalid email or password', 401);
    }

    const verifyPassword = await compare(password, checkUserExist.password);
    if (!verifyPassword) {
      throw new CustomError('Invalid email or password', 401);
    }

    const token = generationToken(checkUserExist.id, checkUserExist.role);
    // if (!token) {
    //   throw new CustomError('Invalid token', 401);
    // }
    return token;
  }

  async validate(id: number): Promise<string> {
    const { role } = await this.model.findByPk(id) as IUser;

    return role;
  }
}
