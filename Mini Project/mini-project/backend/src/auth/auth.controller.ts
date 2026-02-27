import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authDto.username, authDto.password); //
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto.username, authDto.password); //
  }
}