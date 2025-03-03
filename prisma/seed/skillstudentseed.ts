import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
   loginId:1,
   skillId:1
  },
];

async function skillstudentSeed() {
  for (const record of data) {
    await prisma.studentSkill.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default skillstudentSeed;