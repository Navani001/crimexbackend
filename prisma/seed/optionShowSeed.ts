import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "test",
  },
];

async function OptionShowSeed() {
  for (const record of data) {
    await prisma.optionShowType.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default OptionShowSeed;