import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: any): Observable<string> {
    return from(
      this.jwtService.signAsync(
        { user },
        { secret: process.env.JWT_SECRET, expiresIn: '1d' },
      ),
    );
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    return from(bcrypt.compare(newPassword, passwordHash));
  }

  async comparePasswordsPromise(
    newPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    let match = false;
    await bcrypt
      .compare(newPassword, passwordHash)
      .then((result) => {
        if (result) {
          match = true;
        }
      })
      .catch((err) => console.error(err));
    return match;
  }
}
