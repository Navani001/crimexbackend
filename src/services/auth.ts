import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
export async function Login(data:any) {
      if (!data) {
            console.log("No data provided");
            return { message: "Email is required", data: null };
        }
    try{
          const user =await prisma.login.findFirst({where:{email:data.email}})
          console.log(user)
        
          const accessToken = fastify.jwt.sign({ payload:{data} });
          console.log(accessToken)
         return {message:"Login successful",data:accessToken}
    }
    catch(err){
        return {message:"Login successful",data:null}
    }
   
}




