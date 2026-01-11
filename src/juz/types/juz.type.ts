import { Prisma } from '@prisma/client';

export type JuzWithSurahs = Prisma.JuzGetPayload<{
  include: {
    surahs: true;
  };
}>;
