import { IsInt, Max, Min } from 'class-validator';
import {
  MAX_JUZ_NUMBER,
  MIN_JUZ_NUMBER,
} from 'src/common/constant/juz.constants';

export class JuzParamDto {
  @IsInt({
    message: 'Juz number must be an integer.',
  })
  @Min(MIN_JUZ_NUMBER, {
    message: `Juz number must be at least ${MIN_JUZ_NUMBER}.`,
  })
  @Max(MAX_JUZ_NUMBER, {
    message: `Juz number must not exceed ${MAX_JUZ_NUMBER}.`,
  })
  number: number;
}
