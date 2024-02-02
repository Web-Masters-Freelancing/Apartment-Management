/*
  Warnings:

  - You are about to alter the column `email` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `auth` MODIFY `email` VARCHAR(100) NOT NULL;
