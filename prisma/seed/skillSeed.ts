import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "raj",
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