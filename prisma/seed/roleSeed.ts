import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "raj",
  },
];
console.log("hi")
async function roleSeed() {
  for (const record of data) {
    await prisma.role.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default roleSeed;