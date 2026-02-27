import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}