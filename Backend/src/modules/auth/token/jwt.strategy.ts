// src/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: '95b2be0306317619b015a00b5acf01cab2833a91c4b69eed794d492aaf0bf4c9e7f0395c58ebc87ce5d64b488a024d975d8ad7b80c07b15e16fa9b9d74a53112', 
    });
  }

  async validate(payload: any) {
    console.log('Decoded JWT payload:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}