import prisma from "../lib/prisma";

export async function getAllCCTVs(includeCreator = false, includeStation = false) {
  try {
    const cctvs = await prisma.cCTV.findMany({
      include: {
        creator: includeCreator,
        policeStation: includeStation,
      },
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return cctvs;
  } catch (error) {
    console.error('Error fetching CCTVs:', error);
    throw error;
  }
}