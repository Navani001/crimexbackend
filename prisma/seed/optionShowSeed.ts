import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    status: "shuffle",
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