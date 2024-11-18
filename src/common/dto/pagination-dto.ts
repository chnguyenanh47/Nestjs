import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsString()
  page: string = '1';

  @IsOptional()
  @IsInt()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search: string = '';

  @IsOptional()
  @IsString()
  sort: string = 'id';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder: 'ASC' | 'DESC' = 'ASC';
}
