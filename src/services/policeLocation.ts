import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
export async function PoliceLocaation(includeUsers = false, includeCCTVs = false) {
  try {
   const crimeAsign = await prisma.crimeAssign.findMany({
      include:{
        crime:true
      }
    });
    console.log(crimeAsign)
    return crimeAsign;
  } catch (error) {
    console.error('Error fetching police stations:', error);
    throw error;
  }
}
