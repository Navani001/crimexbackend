/*
  Warnings:

  - You are about to drop the column `status` on the `OptionShowType` table. All the data in the column will be lost.
  - Added the required column `name` to the `OptionShowType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OptionShowType" DROP COLUMN "status",
ADD COLUMN     "name" TEXT NOT NULL;
