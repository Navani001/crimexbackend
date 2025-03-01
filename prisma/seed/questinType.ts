import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "raj",
   
  },
];
async function QuestionSeed() {
  for (const record of data) {
    await prisma.questionType.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default QuestionSeed;