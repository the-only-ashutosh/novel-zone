import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
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

export default prisma;
