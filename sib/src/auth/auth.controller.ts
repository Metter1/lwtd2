import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from './dto/user.dto';
import { tokenDto } from './dto/token.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() user: userDto) {
    return this.authService.login(user);
  }
  @Post('/auth/check')
  checkJwt(@Body() token: tokenDto) {
    return this.authService.checkJwt(token);
  }
}
