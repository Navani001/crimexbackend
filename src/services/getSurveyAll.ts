
import prisma from "../lib/prisma";
export async function getallsurvey(userdata:any,body:any) {
      if (!body) {
            console.log("No data provided");
            return { message: "data is required", data: null };
        }
    try{
        const surveys=await prisma.survey.findMany({where:{status:body}});

        console.log(surveys)
         return {message:"creation successful",data:surveys}
    }
    catch(err){
        console.log(err)
        return {message:"Creation failed",data:null}
    }
   
}




