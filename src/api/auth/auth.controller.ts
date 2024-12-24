import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleGuard } from 'src/guards/google/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleGuard)
  googleLogin() {}
  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    const { accessToken, refreshToken } = this.authService.generateTokens(
      req.user,
    );
    return res.redirect(
      `${process.env.BASE_CLIENT_URL}/chuyen-huong?access_token=${accessToken}&refresh_token=${refreshToken}`,
    );
  }
}
