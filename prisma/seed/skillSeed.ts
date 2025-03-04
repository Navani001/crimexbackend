import prisma from "../../src/lib/prisma";


const data = [
  {
    id: 1,
    name: "c",
    level:1
    
  },
   {
    id: 2,
    name: "c",
    level:2
    
  },
   {
    id: 3,
    name: "c",
    level:3
    
  },
   {
    id: 4,
    name: "c",
    level:4
    
  },
   {
    id: 5,
    name: "c",
    level:5
    
  },
   {
    id: 6,
    name: "c",
    level:6
    
  },
   {
    id: 7,
    name: "c",
    level:7
    
  }, {
    id: 8,
    name: "python",
    level:1
    
  },
];

async function skillSeed() {
  for (const record of data) {
    await prisma.skill.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default skillSeed;