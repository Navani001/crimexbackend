import prisma from "../lib/prisma";

export async function getAllCrime(body:any,includeCreator = false, includeStation = false) {
try {
    console.log(body)
    const { 
      crimeTypeId, 
      status, 
      priority, 
      startDate, 
      endDate, 
      isFake,
      createdBy,
      assigned,
      limit = '50',
      offset = '0'
    } = body

    // Build where clause based on query parameters
    const whereClause: any = {};
    whereClause.isPatroll = false;
    if (crimeTypeId) {
      whereClause.crimeTypeId = parseInt(crimeTypeId as string);
    }
    
    if (status) {
      whereClause.status = status as string;
    }
    
    if (priority) {
      whereClause.priority = parseInt(priority as string);
    }
    
    if (startDate && endDate) {
      whereClause.timeOfOccurrence = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    } else if (startDate) {
      whereClause.timeOfOccurrence = {
        gte: new Date(startDate as string)
      };
    } else if (endDate) {
      whereClause.timeOfOccurrence = {
        lte: new Date(endDate as string)
      };
    }
    
   
    
    if (createdBy) {
      whereClause.createdBy = parseInt(createdBy as string);
    }
    
    // If role is public, only show non-fake crimes
    // if (req.user.role === 'public') {
    //   whereClause.isFake = false;
    // }
    
    // Find crimes
    const crimes = await prisma.crime.findMany({
      where: whereClause,
      include: {
        crimeType: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        assignments: assigned === 'true' ? {
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        } : false
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });
    
    // Get total count for pagination
    const totalCount = await prisma.crime.count({
      where: whereClause
    });
    
    return crimes;
  } catch (error) {
    console.error('Error fetching crimes:', error);
    return null
  }
}