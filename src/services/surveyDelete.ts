
import prisma from "../lib/prisma";
export async function deletesurvey(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
          const user =await prisma.survey.delete({where:{id:body.surveyQuestionId}})
          console.log(user)
         return {message:"deletion successful",data:user}
    }
    catch(err){
        console.log(err)
        return {message:"deletion failed",data:null}
    }
   
}




