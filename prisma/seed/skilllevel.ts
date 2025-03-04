import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    skillId:1,
    level:2
  },
  {
    id: 2,
    skillId:1,
    level:2
  },
  {
    id: 3,
    skillId:1,
    level:3
  },
  {
    id: 4,
    skillId:1,
    level:4
  },
  {
    id: 5,
    skillId:1,
    level:5
  },
  {
    id: 6,
    skillId:1,
    level:6
  },
  {
    id: 7,
    skillId:2,
    level:1
  },
  {
    id: 8,
    skillId:2,
    level:2
  },
  {
    id: 9,
    skillId:2,
    level:3
  },
  {
    id: 10,
    skillId:2,
    level:4
  },
  {
    id:11 ,
    skillId:2,
    level:5
  },
 
];

async function skillLevelSeed() {
  for (const record of data) {
    await prisma.skillLevel.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default skillLevelSeed;