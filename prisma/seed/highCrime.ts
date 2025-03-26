import prisma from "../../src/lib/prisma";

export async function crimeTypeSeed() {
  const data = [
    {
        id:1,lat:0,long:0,description:"testing",priority:3,crimeTypeId:1
    }
  ];

  for (const record of data) {
    await prisma.highCrimeArea.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
  console.log(`Seeded ${data.length} crime types`);
}