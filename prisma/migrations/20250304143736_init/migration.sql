/*
  Warnings:

  - You are about to drop the `GroupRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupRole" DROP CONSTRAINT "GroupRole_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupRole" DROP CONSTRAINT "GroupRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSkill" DROP CONSTRAINT "GroupSkill_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSkill" DROP CONSTRAINT "GroupSkill_skillId_fkey";

-- DropTable
DROP TABLE "GroupRole";

-- DropTable
DROP TABLE "GroupSkill";

-- CreateTable
CREATE TABLE "GroupStudent" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "loginId" INTEGER NOT NULL,

    CONSTRAINT "GroupStudent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupStudent_groupId_loginId_key" ON "GroupStudent"("groupId", "loginId");

-- AddForeignKey
ALTER TABLE "GroupStudent" ADD CONSTRAINT "GroupStudent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupStudent" ADD CONSTRAINT "GroupStudent_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
