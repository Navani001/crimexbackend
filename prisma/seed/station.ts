import prisma from "../../src/lib/prisma";

export async function policeStationSeed() {
  const data = [
    {
      id: 1,
      name: 'Central Police Station',
      lat: 18.9622,
      long: 72.8204,
      address: '123 Main Street, Downtown',
      jurisdiction: 'Downtown, Financial District, Harbor Area'
    },
    {
      id: 2,
      name: 'North District Police Station',
      lat: 19.0122,
      long: 72.8456,
      address: '45 North Avenue, North District',
      jurisdiction: 'North District, Industrial Zone, Northern Suburbs'
    },
    {
      id: 3,
      name: 'East District Police Station',
      lat: 18.9522,
      long: 72.9001,
      address: '789 East Boulevard, East District',
      jurisdiction: 'East District, Commercial Area, Eastern Suburbs'
    },
    {
      id: 4,
      name: 'South District Police Station',
      lat: 18.8922,
      long: 72.8345,
      address: '321 South Road, South District',
      jurisdiction: 'South District, Residential Area, Southern Coast'
    },
    {
      id: 5,
      name: 'West District Police Station',
      lat: 18.9322,
      long: 72.7890,
      address: '654 West Highway, West District',
      jurisdiction: 'West District, Technology Park, Western Hills'
    }
  ];

  for (const record of data) {
    await prisma.policeStation.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
  console.log(`Seeded ${data.length} police stations`);
}
