import { Prisma } from '@prisma/client';

export type SurahWithAyahsAndTranslations = Prisma.SurahGetPayload<{
  include: {
    ayahs: {
      include: {
        translations: true;
      };
    };
  };
}>;
