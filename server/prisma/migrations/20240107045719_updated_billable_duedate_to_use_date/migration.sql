/*
  Warnings:

  - Added the required column `monthsCovered` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billable` MODIFY `dueDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `monthsCovered` TEXT NOT NULL;
