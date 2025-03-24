import prisma from "../lib/prisma";

export async function getAllCCTVs(includeCreator = false, includeStation = false) {
  try {
    const cctvs = await prisma.cCTV.findMany({
      include: {
        creator: includeCreator,
        policeStation: includeStation,
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
export async function createCCTVs(body:any,user:any,includeCreator = false, includeStation = false) {
  const {lat,long,location,name} = body;

  try {
    
    const cctvs = await prisma.cCTV.create({
      data:{
        lat,
        long,
        location,
        name,
        isActive:false,
        createdBy: user.id
      }
    });
    console.log(cctvs)
    
    return cctvs;
  } catch (error) {
    console.error('Error fetching CCTVs:', error);
    throw error;
  }
}