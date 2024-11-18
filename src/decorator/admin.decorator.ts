import { SetMetadata } from '@nestjs/common';
import { IS_ADMIN_OPTIONAL } from 'src/constant/constant';
export const isAdmin = () => SetMetadata(IS_ADMIN_OPTIONAL, true);
