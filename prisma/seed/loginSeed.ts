import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    name: "raj",
    email: "raj@gmail.com",
    logo: "ff",
    rollNo:"7376231cs221",
    Stay:"Hostel",
    year:1,
    isDeleted: false,
    updatedAt: new Date(),
    createdAt: new Date(),
    roleId: 1,
    deptId:1
  },
   {
    id: 2,
    name: "ram",
    email: "ram@gmail.com",
    logo: "ff",
    rollNo:"7376231cs121",
    Stay:"Day",
    year:1,
    isDeleted: false,
    updatedAt: new Date(),
    createdAt: new Date(),
    roleId: 1,
    deptId:1
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