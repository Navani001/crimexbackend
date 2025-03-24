import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
export async function PoliceAssign(body:any,user:any,includeUsers = false, includeCCTVs = false) {
  try {
   const crimeAsign = await prisma.crimeAssign.create({
      data:{
        crimeId:1000,
        loginId:body.policeId,
        assignedBy:user.id
      },
    });
    
    return crimeAsign;
  } catch (error) {
    console.error('Error fetching police stations:', error);
    throw error;
  }
}
