-- AlterTable
ALTER TABLE `room` MODIFY `status` ENUM('AVAILABLE', 'NOT_AVAILABLE') NOT NULL DEFAULT 'AVAILABLE';
