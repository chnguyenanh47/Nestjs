import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_ADMIN_OPTIONAL } from 'src/constant/constant';

@Injectable()
export class AdminGuard implements CanActivate {
  validRole: string = 'admin';
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAdmin = this.reflector.get<boolean>(
      IS_ADMIN_OPTIONAL,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    if (!isAdmin) {
      return true;
    }
    if (!request.user || request.user?.role !== this.validRole) {
      throw new ForbiddenException('Access restricted to admin users only');
    }
    return;
  }
}
