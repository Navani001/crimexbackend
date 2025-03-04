
import prisma from "../lib/prisma";
export async function   surveyregister(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        console.log(userdata.payload.id)
        const group=await prisma.surveyParticipant.create({data:{loginId:userdata.payload.id,surveyId:body.surveyId}})
        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"creation successful",data:{group:group}}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
}
export async function questionregister(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        console.log(userdata.payload.id)


        const group=await prisma.studentSurveyResponse.create({data:{loginId:userdata.payload.id,surveyQuestionId:body.surveyQuestionId,SelectedOptionId:body.SelectedOptionId}})
        //   const user =await prisma.survey.create({data:{name:body.name,facultyId:userdata.payload.id,status:"draft",groupId:body.groupId?body.groupId:-1}})
         return {message:"creation successful",data:{group:group}}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
}

export async function surveyview(userdata:any,body:any) {
      
    try{
        console.log(userdata.payload.id)
const userPresent=await prisma.surveyParticipant.findFirst({where:{surveyId:parseInt(body),loginId:userdata.payload.id}})
if(userPresent){
const surveyData = await prisma.survey.findFirst({
        include:{
            surveyQuestions:{
                include:{
                    optionsQuestions:{
                        include:{
                            option:true,      
                        }
                    },
                    studentSurveyResponses:{
                        where:{
                            loginId:parseInt(userdata.payload.id)
                        }
                },
            },
           
        }
    }})
    return {message:"fetch successful",data:surveyData}

}
        // const group=await prisma.studentSurveyResponse.create({data:{loginId:userdata.payload.id,surveyQuestionId:body.surveyQuestionId,SelectedOptionId:body.SelectedOptionId}})
        //   const surveyData =await prisma.survey.findFirst({where:{id:parseInt(body)},
        //     include:{
        //        surveyParticipants:{
        //         where:{
        //             loginId:parseInt(userdata.payload.id)
        //         }
        //        }
        //     }
        //   })
         return {message:"user not present successful",data:null}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    }
}