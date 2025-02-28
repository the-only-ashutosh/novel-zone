import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["info"] }).$extends({
    result: {
      book: {
        Ratings: {
          needs: { userrated: true, totalStars: true },
          compute(book) {
            return book.totalStars / book.userrated;
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
