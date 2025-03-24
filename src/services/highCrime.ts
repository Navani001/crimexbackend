
import prisma from "../lib/prisma";
export async function HighCrime(includeUsers = false, includeCCTVs = false) {
  try {
   const highCrime = await prisma.highCrimeArea.findMany();
    
    return highCrime;
  } catch (error) {
    console.error('Error fetching police stations:', error);
    throw error;
  }
}
