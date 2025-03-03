/*
  Warnings:

  - You are about to drop the column `type` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "type",
DROP COLUMN "typeId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "rp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "GroupSkill" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "GroupSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRole" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "GroupRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyGroup" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "SurveyGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyParticipant" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "loginId" INTEGER NOT NULL,

    CONSTRAINT "SurveyParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupSkill_groupId_skillId_key" ON "GroupSkill"("groupId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupRole_groupId_roleId_key" ON "GroupRole"("groupId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyGroup_surveyId_groupId_key" ON "SurveyGroup"("surveyId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyParticipant_surveyId_loginId_key" ON "SurveyParticipant"("surveyId", "loginId");

-- AddForeignKey
ALTER TABLE "GroupSkill" ADD CONSTRAINT "GroupSkill_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSkill" ADD CONSTRAINT "GroupSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyGroup" ADD CONSTRAINT "SurveyGroup_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyGroup" ADD CONSTRAINT "SurveyGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyParticipant" ADD CONSTRAINT "SurveyParticipant_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyParticipant" ADD CONSTRAINT "SurveyParticipant_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
