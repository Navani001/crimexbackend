import prisma from "../../src/lib/prisma";

const data = [
  {
    id: 1,
    name: "c",
   
  },
  {
    id: 2,
    name: "python",
  
  },
];

async function skillSeed() {
  for (const record of data) {
    await prisma.skill.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default skillSeed;