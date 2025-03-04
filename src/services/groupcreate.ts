
import prisma from "../lib/prisma";
export async function groupcreation(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        const group=await prisma.group.create({data:{name:body.name}})
        const gropustudent=await prisma.groupStudent.createMany({data:body.students.map((student:any)=>{return {loginId:student.id,groupId:group.id}})})

        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"creation successful",data:{group:group,gropustudent:gropustudent}}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
}
