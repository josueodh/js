import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already used by another person');
    }

    const hashedPassoword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassoword,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
