import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1000s',
        },
      }),
    }),
  ],
  providers: [RolesGuard, JwtAuthGuard, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
