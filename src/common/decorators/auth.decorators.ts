import { applyDecorators, SetMetadata } from '@nestjs/common';
export const skipLogin = () => {
  return applyDecorators(SetMetadata('skip-login', true));
};
