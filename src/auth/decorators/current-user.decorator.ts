import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
      return ctx.switchToHttp().getRequest()['headers']['authorization'];
  },
);
