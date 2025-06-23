import { IsInt, Max, Min } from 'class-validator';

export class SurahParamDto {
  @IsInt({
    message: 'Surah number must be an integer.',
  })
  @Min(1, {
    message: 'Surah number must be at least 1.',
  })
  @Max(114, {
    message: 'Surah number must not exceed 114.',
  })
  number: number;
}
