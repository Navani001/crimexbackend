import prisma from "../lib/prisma";

export async function CreateCrime(body:any,user:any,includeCreator = false, includeStation = false) {
 try {
    const { 
      crimeTypeId, 
      lat, 
      long, 
      description, 
      timeOfOccurrence, 
      location, 
      loginId,
      isPatroll=false,
      priority ,
      isCrime,
      isFake=false
    } = body;
    
    console.log(body)
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
        isPatroll:!isCrime,
        isFake: isFake
      }
    });
  
    if(isPatroll){
      console.log("creating assign",loginId,user.id)
      const tem=await prisma.crimeAssign.create({
        data:{
          crimeId: crime.id,
          loginId: loginId,
          assignedBy:user.id

        }
      })
      console.log(tem)
    }
    console.log("hl")
    return crime
  } catch (error) {
    console.error('Error creating crime:', error);
    return null
  }

}