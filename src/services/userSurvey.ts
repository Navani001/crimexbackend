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
    const roleId = student.roleId;
    const skillIds = student.studentSkills.map(ss => ss.skillId);
    console.log(roleId, skillIds);
    
    // Find all available surveys for the student
    const availableSurveys = await prisma.survey.findMany({
      where: {
        OR: [
          { groupId: null },
          {
            groups: {
              some: {
                group: {
                  roles: {
                    some: {
                      roleId: roleId
                    }
                  },
                  skills:{
                    some: {
                      skillId: {
                        in: skillIds
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      include: {
        groups: {
          include: {
            group: {
              include: {
                roles: true,
                skills: true
              }
            }
          }
        }
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
    console.log("Surveys found:", availableSurveys);
    
    return { message: "Query successful", data: availableSurveys };
  } catch (err) {
    console.log(err);
    return { message: "Query failed", data: null };
  }
}