import { Prisma } from '@prisma/client';

export type SurahWithAyahsAndTranslation = Prisma.SurahGetPayload<{
  include: {
    ayahs: {
      include: {
        translations: true;
      };
    };
  };
}>;
