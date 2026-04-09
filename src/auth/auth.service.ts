import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.login(userLoginDto);
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token, user };
  }
}
