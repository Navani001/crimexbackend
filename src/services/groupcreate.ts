
import prisma from "../lib/prisma";
export async function groupcreation(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        const group=await prisma.group.create({data:{name:body.name}})
        const groupskill =await prisma.groupSkill.createMany({data:body.skills.map((skill:any)=>{return {groupId:group.id,skillId:skill.id}})})
        const grouproll=await prisma.groupRole.createMany({data:body.roles.map((role:any)=>{return {groupId:group.id,roleId:role.id}})})

        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"creation successful",data:{group:group,groupskill:groupskill,grouproll}}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}