
import prisma from "../lib/prisma";
export async function groupgetBackend(userdata:any,body:any) {
   
    try{
        const groups=await prisma.group.findMany()
        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"creation successful",data:groups}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}