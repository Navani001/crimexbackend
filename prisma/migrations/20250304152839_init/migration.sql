-- DropForeignKey
ALTER TABLE "StudentSkill" DROP CONSTRAINT "StudentSkill_skillId_fkey";

-- CreateTable
CREATE TABLE "SkillLevel" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "SkillLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillLevel" ADD CONSTRAINT "SkillLevel_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSkill" ADD CONSTRAINT "StudentSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
