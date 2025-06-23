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
    message: 'Juz must be at least 1.',
  })
  @Max(30, {
    message: 'Juz must not exceed 30.',
  })
  juz?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Page number must be at least 1.',
  })
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Limit must be at least 1.',
  })
  @Max(114, {
    message: 'Limit must not exceed 114.',
  })
  limit: number = 10;
}
