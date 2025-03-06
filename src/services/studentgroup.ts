
import prisma from "../lib/prisma";
export async function studentgroup(userdata:any,body:any) {
      
    try{
      console.log(body.skill)
  const studentLogins = await prisma.login.findMany({
    where: {
      rp:{
        gte:body.minRp,
        lte:body.maxRp
      },
      roleId: {
        in:body.role
      },
       studentSkills: {
          some: body.skills.length > 0 // Only filter if skills is not empty
            ? {
                skillId: {
                  in: body.skills
                }
              }
            : undefined
        },
      isDeleted: false // Optional: only get non-deleted accounts
    },
    include: {
      dept: true, // Include the department information if needed
      studentSkills:{
        where:{
          skillId:{
            in:body.skill
          }
        }
      },
      role: true // Include the role information if needed
    }
  })
          //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"fetch successful",data:studentLogins}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    }
   
}