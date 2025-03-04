
import prisma from "../lib/prisma";
export async function getskill(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        const survey=await prisma.skill.findMany({include:{
            skillLevels:true
        }})
              console.log(survey)
        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"fetch successful",data:survey}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    }  
}

export async function getrole(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        const survey=await prisma.role.findMany()
              console.log(survey)
        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"fetch successful",data:survey}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    }  
}