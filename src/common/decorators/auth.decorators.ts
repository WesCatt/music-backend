import { applyDecorators, SetMetadata } from '@nestjs/common';
export const SkipLogin = () => {
  return applyDecorators(SetMetadata('skip-login', true));
};
