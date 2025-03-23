import prisma from "../lib/prisma";
function calculateDistance(lat1:any, lon1:any, lat2:any, lon2:any) {
  // Earth's radius in meters
  const R = 6371000;
  
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}
export async function CrimeSpot(body:any,user:any,includeCreator = false, includeStation = false) {
 try {
    const { 
      lat, 
      long, 
    } = body;
    
    // Validate required fields
    if ( !lat || !long ) {
      return null
    }
    
    const latitude = Number(lat);
    const longitude = Number(long);
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
     const officer = await prisma.login.findUnique({
      where: { id: user.id },
      select: { id: true, name: true, role: true }
    });
    
    if (!officer) {
      return null
    }
    
    // Get all crimes assigned to this officer
    const assignedCrimes = await prisma.crimeAssign.findMany({
      where: {
        loginId: user.id,
        status: { not: 'closed' }
      },
      include: {
        crime: {
          include: {
            crimeType: true
          }
        }
      }
    });
    console.log(assignedCrimes)
    if(assignedCrimes.length> 0) {
        return {
            crimes: assignedCrimes,
            message:"assigned"
        }
    }

    // Create the crime
    const nearbyUnassignedCrimes = crimes.filter(crime => {
      // Check if crime is within 500 meters
      const distance = calculateDistance(
        latitude, 
        longitude,
        Number(crime.lat), 
        Number(crime.long)
      );
      
      // Check if the crime is unassigned
      const isUnassigned = crime.assignments.length === 0;
      
      return distance <= 500 && isUnassigned;
    });
      const result = nearbyUnassignedCrimes.map(crime => {
      const distance = calculateDistance(
        latitude, 
        longitude,
        Number(crime.lat), 
        Number(crime.long)
      );
      
      return {
        ...crime,
        distanceFromLocation: Math.round(distance)
      };
    });
    
    // Sort by distance (closest first)
    result.sort((a, b) => a.distanceFromLocation - b.distanceFromLocation);
    console.log(result)
    const crimeAsign = await prisma.crimeAssign.create({
      data:{
        crimeId: result[0].id,
        loginId:user.id,
        assignedBy:4
      },
    });
    return {
      location: {
        lat: result[0].lat,
        long: result[0].long
      },
      crimes: result,
      message: "unassigned",
      count: result.length
    }
  } catch (error) {
    console.error('Error creating crime:', error);
    return null
  }

}