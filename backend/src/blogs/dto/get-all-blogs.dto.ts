import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../blog-status.enum';

export class GetAllBlogsDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  author?: string;
}
