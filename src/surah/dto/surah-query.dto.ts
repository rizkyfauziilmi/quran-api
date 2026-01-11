import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AYAH_SUPPORTED_LANGUAGES } from 'src/common/constant/ayah.constants';
import {
  MAX_JUZ_NUMBER,
  MIN_JUZ_NUMBER,
} from 'src/common/constant/juz.constants';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_SURAH_NUMBER,
  MIN_SURAH_NUMBER,
  SURAH_CLASISIFICATION,
} from 'src/common/constant/surah.constants';
import { joinWithOr } from 'src/common/helpers/string.helper';

export class SurahsQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  })
  @IsIn(SURAH_CLASISIFICATION, {
    // join with , and the end join with or
    message: `Classification must be either ${joinWithOr(SURAH_CLASISIFICATION)}.`,
  })
  classification?: string;

  @IsOptional()
  @IsInt({
    message: 'Juz must be an integer.',
  })
  @Min(MIN_JUZ_NUMBER, {
    message: `Juz must be at least ${MIN_JUZ_NUMBER}.`,
  })
  @Max(MAX_JUZ_NUMBER, {
    message: `Juz must not exceed ${MAX_JUZ_NUMBER}.`,
  })
  juz?: number;

  @IsOptional()
  @IsInt({
    message: 'Page number must be an integer.',
  })
  @Min(1, {
    message: 'Page number must be at least 1.',
  })
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @IsInt({
    message: 'Limit must be an integer.',
  })
  @Min(MIN_SURAH_NUMBER, {
    message: `Limit must be at least ${MIN_SURAH_NUMBER}.`,
  })
  @Max(MAX_SURAH_NUMBER, {
    message: `Limit must not exceed ${MAX_SURAH_NUMBER}.`,
  })
  limit: number = DEFAULT_LIMIT;
}

export class SurahQueryDto {
  @IsOptional()
  @IsIn(AYAH_SUPPORTED_LANGUAGES, {
    each: true,
    message: `Language code must be either ${joinWithOr(AYAH_SUPPORTED_LANGUAGES)}.`,
  })
  languageCode?: string[];
}
