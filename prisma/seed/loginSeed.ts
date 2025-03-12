import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    name: "raj",
    email: "navaneethakrishnan.cs23@bitsathy.ac.in",
    logo: "ff",
    isDeleted: false,
    password:"123",
    updatedAt: new Date(),
    createdAt: new Date(),
    
  },
   {
    id: 2,
    name: "ram",
    email: "ram@gmail.com",
    logo: "ff",
    isDeleted: false,
    updatedAt: new Date(),
    createdAt: new Date(),
   
  }
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