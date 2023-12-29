/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Billable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `auth` DROP FOREIGN KEY `Auth_userId_fkey`;

-- DropForeignKey
ALTER TABLE `billable` DROP FOREIGN KEY `Billable_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `billable` DROP FOREIGN KEY `Billable_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `Payments_billableId_fkey`;

-- CreateTable
CREATE TABLE `RoomHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `occupiedOn` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `RoomHistory_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Billable_userId_key` ON `Billable`(`userId`);

-- AddForeignKey
ALTER TABLE `Auth` ADD CONSTRAINT `Auth_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billable` ADD CONSTRAINT `Billable_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billable` ADD CONSTRAINT `Billable_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomHistory` ADD CONSTRAINT `RoomHistory_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomHistory` ADD CONSTRAINT `RoomHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_billableId_fkey` FOREIGN KEY (`billableId`) REFERENCES `Billable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
