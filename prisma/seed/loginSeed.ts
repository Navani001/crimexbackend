import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    name: "raj",
    email: "raj@gmail.com",
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