import { UserModule } from './user/user.module';
import { CarsModule } from './cars/car.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    CarsModule,
    PrismaModule,
  ],
})
export class AppModule {}
