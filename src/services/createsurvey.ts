
import prisma from "../lib/prisma";
export async function Create(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
          const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
          console.log(user)
         return {message:"creation successful",data:user}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}




