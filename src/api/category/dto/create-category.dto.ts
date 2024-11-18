import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Tối đa 50 kí tự' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'Tối đa 250 kí tự' })
  description?: string;
}
