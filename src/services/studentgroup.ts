
import prisma from "../lib/prisma";
export async function studentgroup(userdata:any,body:any) {
      
    try{
  const studentLogins = await prisma.login.findMany({
    where: {
      roleId: {
        in:body.role
      },
      isDeleted: false // Optional: only get non-deleted accounts
    },
    include: {
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