import { IsInt, Max, Min } from 'class-validator';
import {
  MAX_SURAH_NUMBER,
  MIN_SURAH_NUMBER,
} from 'src/common/constant/surah.constants';

export class SurahParamDto {
  @IsInt({
    message: 'Surah number must be an integer.',
  })
  @Min(MIN_SURAH_NUMBER, {
    message: `Surah number must be at least ${MIN_SURAH_NUMBER}.`,
  })
  @Max(MAX_SURAH_NUMBER, {
    message: `Surah number must not exceed ${MAX_SURAH_NUMBER}.`,
  })
  number: number;
}
