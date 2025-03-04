import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    type: "agree-disagree",
   
  },
];
async function OptionTypeSeed() {
  for (const record of data) {
    await prisma.optionType.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default OptionTypeSeed;