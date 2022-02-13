import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDto } from './dto/user.dto';
import * as dataUser from './users.json';
import { Payload } from './../interfaces/payload.token';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(userDto: userDto) {
    const user = this.validateUser(userDto);
    const token = this.generateToken(user);
    const username = this.checkJwt(token);
    return { username: username.username, token: token.token };
  }

  checkJwt(token: tokenDto) {
    try {
      const user: Payload = this.jwtService.verify(token.token);
      return { username: user.username };
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }

  private validateUser(userDto: userDto) {
    const username = userDto.username;
    const password = userDto.password;
    // Имитация запроса к бд
    for (const a of dataUser) {
      if (a[0].username === username && a[0].password === password) {
        const user: Payload = { currentDate: Date.now(), username };
        return user;
      }
    }
    throw new UnauthorizedException('Wrong username or password');
  }

  private generateToken(user: Payload) {
    const payload: Payload = {
      currentDate: user.currentDate,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
