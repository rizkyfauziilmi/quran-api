import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class QuerySurahsDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  })
  @IsIn(['Medani', 'Makki'], {
    message: 'The value must be either "Medani" or "Makki".',
  })
  classification?: string;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'The value must be a positive integer.',
  })
  @Max(30, {
    message: 'The value must be a positive integer less than or equal to 30.',
  })
  juz?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'The value must be a positive integer.',
  })
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'The value must be a positive integer.',
  })
  @Max(114, {
    message: 'The value must be a positive integer less than or equal to 114.',
  })
  limit: number = 10;
}
