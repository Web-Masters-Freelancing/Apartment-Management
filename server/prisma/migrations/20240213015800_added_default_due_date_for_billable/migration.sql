/*
  Warnings:

  - The `dueDate` column on the `billable` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `billable` DROP COLUMN `dueDate`,
    ADD COLUMN `dueDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
