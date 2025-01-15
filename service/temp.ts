import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "Martial Peak";

await prisma.chapter.deleteMany({ where: { book: { title } } }).then((data) => {
  console.log(`Deleted ${data.count} chapters for book "${title}"`);
});
