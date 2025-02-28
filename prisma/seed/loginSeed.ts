import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 1,
    name: "raj",
    email: "raj@email.com",
    logo: "ff",
    isDeleted: false,
    updatedAt: new Date(),
    createdAt: new Date(),
    roleId: 1
  },
];

async function loginSeed() {
  for (const record of data) {
    await prisma.login.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default loginSeed;