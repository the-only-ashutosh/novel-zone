import { PrismaClient } from "@prisma/client";
const pri = new PrismaClient();
const b = await pri.book
  .findMany({
    where: { chapter: { some: { id: { gt: 0 } } } },
    select: {
      _count: { select: { chapter: true } },
      id: true,
      title: true,
      chapter: {
        orderBy: { number: "desc" },
        take: 1,
        select: { number: true },
      },
    },
  })
  .then((data) => {
    const f = [];
    for (const bk of data) {
      if (bk._count.chapter < bk.chapter[0].number) {
        f.push({
          id: bk.id,
          chapter: bk.chapter[0].number,
          count: bk._count.chapter,
          title: bk.title,
        });
      }
    }
    return f;
  });
console.log(b.length);
