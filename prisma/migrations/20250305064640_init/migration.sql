-- DropForeignKey
ALTER TABLE "GroupSkill" DROP CONSTRAINT "GroupSkill_skillId_fkey";

-- AddForeignKey
ALTER TABLE "GroupSkill" ADD CONSTRAINT "GroupSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
