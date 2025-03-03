import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1000,
    name: "raj",
    optionTypeId:1,
    isPredefined: true,
  },
    {
    id: 2000,
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