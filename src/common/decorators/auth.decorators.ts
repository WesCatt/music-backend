import { applyDecorators, SetMetadata } from '@nestjs/common';

// 跳过登录，无需token
export const SkipLogin = () => {
  return applyDecorators(SetMetadata('skip-login', true));
};
