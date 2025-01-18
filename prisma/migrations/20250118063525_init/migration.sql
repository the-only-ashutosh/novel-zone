-- CreateTable
CREATE TABLE `recents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `addAt` DATETIME(3) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `recents_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recents` ADD CONSTRAINT `recents_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
