import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    optionTypeId:1,
    option: "test",
  },
];

async function preDifinedOptionSeed() {
  for (const record of data) {
    await prisma.preDefinedOptions.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default preDifinedOptionSeed;