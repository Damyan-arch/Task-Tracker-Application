import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authDto: any): Promise<void> {
    return this.authService.signUp(authDto.username, authDto.password);
  }

  @Post('/signin')
  signIn(@Body() authDto: any): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto.username, authDto.password);
  }
}