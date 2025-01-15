-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `author_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `bookUrl` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalStars` INTEGER NOT NULL,
    `isHot` BOOLEAN NOT NULL,
    `userrated` INTEGER NOT NULL,
    `aspectRatio` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `ratings` DECIMAL(65, 30) NOT NULL,
    `views` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `description` LONGBLOB NOT NULL,
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `book_title_key`(`title`),
    UNIQUE INDEX `book_bookUrl_key`(`bookUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGBLOB NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `likes` INTEGER NOT NULL,
    `views` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `oldUrl` VARCHAR(191) NOT NULL,
    `addAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `chapter_oldUrl_key`(`oldUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `genre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_booktocategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_booktocategory_AB_unique`(`A`, `B`),
    INDEX `_booktocategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_booktogenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_booktogenre_AB_unique`(`A`, `B`),
    INDEX `_booktogenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapter` ADD CONSTRAINT `chapter_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_booktocategory` ADD CONSTRAINT `_booktocategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_booktocategory` ADD CONSTRAINT `_booktocategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_booktogenre` ADD CONSTRAINT `_booktogenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_booktogenre` ADD CONSTRAINT `_booktogenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
