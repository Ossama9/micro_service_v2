/*
  Warnings:

  - You are about to drop the column `userId` on the `Announce` table. All the data in the column will be lost.
  - Added the required column `hotelId` to the `Announce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Announce` DROP COLUMN `userId`,
    ADD COLUMN `hotelId` VARCHAR(191) NOT NULL;
