
import prisma from "../lib/prisma";
export async function createSurvey(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
          const survey =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
          if(body.groupId){
            await prisma.surveyGroup.create({data:{surveyId:survey.id,groupId:body.groupId}})
          }
          console.log(survey)
         return {message:"creation successful",data:survey}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}




