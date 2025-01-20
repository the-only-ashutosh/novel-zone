-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `chapter_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `recents` DROP FOREIGN KEY `recents_bookId_fkey`;

-- DropIndex
DROP INDEX `chapter_bookId_fkey` ON `chapter`;

-- AddForeignKey
ALTER TABLE `chapter` ADD CONSTRAINT `chapter_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recents` ADD CONSTRAINT `recents_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
