import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1000,
    name: "agree",
    optionTypeId:1,
    priority:2,
    isPredefined: true,
  },
    {
    id: 2000,
    name: "disagress",
    optionTypeId:1,
      priority:3,
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