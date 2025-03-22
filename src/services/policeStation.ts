import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
export async function getAllPoliceStations(includeUsers = false, includeCCTVs = false) {
  try {
    const stations = await prisma.policeStation.findMany({
      include: {
        users: includeUsers,
        cctvs: includeCCTVs,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return stations;
  } catch (error) {
    console.error('Error fetching police stations:', error);
    throw error;
  }
}
