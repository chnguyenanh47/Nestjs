import { IsOptional, IsString } from 'class-validator';

export class ResponseDto<T> {
  @IsString()
  message: string;

  @IsOptional()
  data?: T;

  @IsOptional()
  meta?: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
  };
}
