/*
  Warnings:

  - You are about to drop the column `facultyOptionSelectedId` on the `StudentSurveyResponse` table. All the data in the column will be lost.
  - You are about to drop the column `preDefinedOptionId` on the `StudentSurveyResponse` table. All the data in the column will be lost.
  - Added the required column `SelectedOptionId` to the `StudentSurveyResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentSurveyResponse" DROP COLUMN "facultyOptionSelectedId",
DROP COLUMN "preDefinedOptionId",
ADD COLUMN     "SelectedOptionId" INTEGER NOT NULL;
