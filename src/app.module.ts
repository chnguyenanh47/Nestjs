import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';
import { CategoryModule } from './api/category/category.module';
import { PetModule } from './api/pet/pet.module';
import googoleAuthConfig from './config/googole-auth.config';
import { GoogleStrategy } from './strategies/google.strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConfigModule.forFeature(googoleAuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),

      inject: [ConfigService],
    }),

    DatabaseModule,

    AuthModule,

    UserModule,

    ProductModule,

    CategoryModule,

    PetModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, AdminGuard, GoogleStrategy],
})
export class AppModule {}
