
import prisma from "../lib/prisma";
export async function Question(userdata:any,body:any) {
    console.log(body)
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
          const user =await prisma.surveyQuestion.create({data:
           {
            questionTypeId:body.questionTypeId,
            surveyId: body.surveyId,
            question: body.question,
            optionTypeId:body.optionTypeId,
            score: body.score?body.score:-1,
            isOther:body.isOther,
            isMultiple:body.isMultiple

        }})
          console.log(user)
         return {message:"creation successful",data:user}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}




