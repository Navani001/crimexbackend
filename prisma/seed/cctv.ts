import prisma from "../../src/lib/prisma";

export async function cctvSeed() {
  const data = [
    {
      id: 1000,
      name: 'Downtown Junction Camera',
      lat: 18.9600,
      long: 72.8250,
      location: 'Main Street & First Avenue',
      createdBy: 1,
      policeStationId: 1,
      installedDate: new Date('2024-01-15'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2000,
      name: 'North Mall Entrance',
      lat: 19.0100,
      long: 72.8470,
      location: 'North Mall Main Entrance',
      createdBy: 1,
      policeStationId: 2,
      installedDate: new Date('2024-02-10'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 30000,
      name: 'East Park Camera',
      lat: 18.9530,
      long: 72.9020,
      location: 'East City Park',
      createdBy: 1,
      policeStationId: 3,
      installedDate: new Date('2024-01-25'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Central Station Traffic',
      lat: 18.9620,
      long: 72.8210,
      location: 'Central Station Traffic Signal',
      createdBy: 1,
      policeStationId: 1,
      installedDate: new Date('2024-03-05'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  for (const record of data) {
    await prisma.cCTV.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
  console.log(`Seeded ${data.length} CCTV cameras`);
}
