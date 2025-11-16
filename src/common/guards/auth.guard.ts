import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isNeedLogin: boolean = this.reflector.getAllAndOverride(
      'skip-login',
      [context.getHandler(), context.getClass()],
    );
    if (isNeedLogin) return true;

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = this.jwtService.verify(token); // 校验 token
      request.user = payload; // 把用户信息挂在请求上
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
