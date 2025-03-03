
import prisma from "../lib/prisma";
export async function userSurvey(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
          const user =await prisma.surveyQuestion.delete({where:{id:body.surveyQuestionId}})
          console.log(user)
         return {message:"creation successful",data:user}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}




