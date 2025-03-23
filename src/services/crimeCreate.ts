import prisma from "../lib/prisma";

export async function CreateCrime(body:any,includeCreator = false, includeStation = false) {
 try {
    const { 
      crimeTypeId, 
      lat, 
      long, 
      description, 
      timeOfOccurrence, 
      location, 
      priority 
    } = body;
    
    console.log("vc")
    // Validate required fields
    if (!crimeTypeId || !lat || !long || !description ) {
      return null
    }
    
    
    // Create the crime
    const crime = await prisma.crime.create({
      data: {
        crimeTypeId: parseInt(crimeTypeId),
        lat: parseFloat(lat),
        long: parseFloat(long),
        description,
        timeOfOccurrence: new Date(),
        location: location || '',
        priority: priority ? parseInt(priority) : 1,
        createdBy: 1,
        // Public users cannot create fake crimes
        isFake: true
      }
    });
    console.log("hl")
    return crime
  } catch (error) {
    console.error('Error creating crime:', error);
    return null
  }

}