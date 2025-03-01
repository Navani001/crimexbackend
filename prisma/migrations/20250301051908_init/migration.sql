/*
  Warnings:

  - Added the required column `label` to the `OptionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OptionType" ADD COLUMN     "label" TEXT NOT NULL;
