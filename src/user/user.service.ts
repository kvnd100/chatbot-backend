import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userRegisterDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: userRegisterDto.username },
    });
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = (await bcrypt.hash(
      userRegisterDto.password,
      10,
    )) as string;
    const user = this.userRepository.create({
      ...userRegisterDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const { password: _password, ...userWithoutPassword } = user;
    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isPasswordValid = (await bcrypt.compare(
      userLoginDto.password,
      user.password,
    )) as boolean;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
