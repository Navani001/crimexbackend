import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
async function getAreasNeedingCCTV() {
  return prisma.$queryRaw`
    SELECT 
        'CCTV Needed' AS recommendation_type,
        hca.lat,
        hca.long,
        ct.name AS crime_type,
        COUNT(c.id) AS crime_count
    FROM 
        "HighCrimeArea" hca
    JOIN 
        "CrimeType" ct ON hca."crimeTypeId" = ct.id
    LEFT JOIN 
        "Crime" c ON 
            c.lat BETWEEN hca.lat - 0.01 AND hca.lat + 0.01 
            AND c.long BETWEEN hca.long - 0.01 AND hca.long + 0.01
    WHERE 
        (
            SELECT COUNT(*) 
            FROM "CCTV" 
            WHERE 
                lat BETWEEN hca.lat - 0.01 AND hca.lat + 0.01 
                AND long BETWEEN hca.long - 0.01 AND hca.long + 0.01
        ) = 0
    GROUP BY 
        hca.lat, hca.long, ct.name
    HAVING 
        COUNT(c.id) > 5
  `
}
async function getCrimesNeedingAssignment() {
  return prisma.$queryRaw`
    SELECT 
        'Police Assignment Needed' AS recommendation_type,
        c.id AS crime_id,
        c.lat,
        c.long,
        ct.name AS crime_type,
        c.priority
    FROM 
        "Crime" c
    JOIN 
        "CrimeType" ct ON c."crimeTypeId" = ct.id
    LEFT JOIN 
        "CrimeAssign" ca ON c.id = ca."crimeId"
    WHERE 
        ca.id IS NULL  -- No assignments exist
        AND c.status = 'reported'
    ORDER BY 
        c.priority DESC
    LIMIT 20
  `
}
export async function Recommendation(includeUsers = false, includeCCTVs = false) {
 try {
    const cctvNeeds = await getAreasNeedingCCTV()
    const policeAssignmentNeeds = await getCrimesNeedingAssignment()

    return {
      cctvNeeds,
      policeAssignmentNeeds
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    throw error
  }
}
