import prisma from "../../src/lib/prisma";

export async function crimeTypeSeed() {
  const data = [
    { id: 1, name: 'Theft', severity: 3 },
    { id: 2, name: 'Robbery', severity: 5 },
    { id: 3, name: 'Assault', severity: 6 },
    { id: 4, name: 'Vehicle Theft', severity: 4 },
    { id: 5, name: 'Burglary', severity: 5 },
    { id: 6, name: 'Vandalism', severity: 2 },
    { id: 7, name: 'Drug Offense', severity: 4 },
    { id: 8, name: 'Fraud', severity: 3 },
    { id: 9, name: 'Homicide', severity: 10 },
    { id: 10, name: 'Sexual Assault', severity: 9 },
    { id: 11, name: 'Kidnapping', severity: 8 },
    { id: 12, name: 'Public Disturbance', severity: 1 },
    { id: 13, name: 'Cybercrime', severity: 3 },
    { id: 14, name: 'Domestic Violence', severity: 7 },
     { id: 14, name: 'pattrol', severity: 0 }
  ];

  for (const record of data) {
    await prisma.crimeType.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
  console.log(`Seeded ${data.length} crime types`);
}