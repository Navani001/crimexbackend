
import prisma from "../lib/prisma";
export async function HighCrimeCreate(body:any,includeUsers = false, includeCCTVs = false) {
  try {
   const highCrime = await prisma.highCrimeArea.create({data:{
    lat:body.lat,
    long:body.long,
    description:body.description,
    priority:body.priority?body.priority:1,
    crimeTypeId:body.crimeTypeId
   }});
    console.log(highCrime)
    return highCrime;
  } catch (error) {
    console.error('Error fetching police stations:', error);
    throw error;
  }
}
