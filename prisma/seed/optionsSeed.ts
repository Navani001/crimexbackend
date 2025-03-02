import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "raj",
    optionTypeId:1,
    isPredefined: true,
  },
    {
    id: 2,
    name: "ram",
    optionTypeId:1,
    isPredefined: true,
  },
];
async function OptionsSeed() {
  for (const record of data) {
    await prisma.options.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default OptionsSeed;