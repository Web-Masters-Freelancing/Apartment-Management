/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `email` ON `user`;

-- AlterTable
ALTER TABLE `auth` ADD COLUMN `email` VARCHAR(250) NOT NULL,
    ADD COLUMN `password` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `password`;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `Auth`(`email`);
