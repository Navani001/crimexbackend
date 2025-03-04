import prisma from "../lib/prisma";

export async function userSurvey(userdata: any, body: any) {
  try {
    const student = await prisma.login.findFirst({
      where: { id: userdata.id },
      include: {
        role: true,
        studentSkills: true
      }
    });
    
    if (!student) {
      throw new Error("Student not found");
    }
    
    // Get student's role ID and skill IDs

    
    
    // Find all available surveys for the student
    const availableSurveys = await prisma.survey.findMany({
      where: {
        OR: [
          { groupId: null },
          {
            groups: {
              some: {
                group: {
                  groupStudents:{
                    some:{
                      loginId:student.id
                    }
                  }
                }
              }
            }
          }
        ]
      },
      
      orderBy: {
        createdAt: 'desc'
      }
    });
    // const availableSurveys=await prisma.survey.findMany({
    //    include:{
    //     groups:true
    //    }

    // })
    console.log("Surveys found:");
    
    return { message: "Query successful", data: availableSurveys };
  } catch (err) {
    console.log(err);
    return { message: "Query failed", data: null };
  }
}