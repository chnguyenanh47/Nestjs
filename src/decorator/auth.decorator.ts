import { SetMetadata } from '@nestjs/common';
import { IS_AUTH_OPTIONAL } from 'src/constant/constant';
export const isAuth = () => {
  return SetMetadata(IS_AUTH_OPTIONAL, true);
};
