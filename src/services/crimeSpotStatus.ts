import prisma from "../lib/prisma";
export async function CrimeSpot(body:any,user:any,includeCreator = false, includeStation = false) {
 try {
    const { 
      crimeId 
    } = body;
    
      const crimes = await prisma.crime.findMany({
      where: {
        status: {
          not: 'resolved'
        }
      },
      include: {
        crimeType: true,
        assignments: true
      }
    });
     
    
   
    
   
   return {messgae:"success"}
  } catch (error) {
    console.error('Error creating crime:', error);
    return null
  }

}