
import prisma from "../lib/prisma";
export async function options(userdata:any,body:any) {
     
    try{
        const surveys=await prisma.optionType.findMany();

        console.log(surveys)
         return {message:"fetch successful",data:surveys}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    } 
}
export async function optionshow(userdata:any,body:any) {
      
    try{
        const surveys=await prisma.optionShowType.findMany();

        console.log(surveys)
         return {message:"fetch successful",data:surveys}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    } 
}
export async function optionofType(userdata:any,body:any) {
      
    try{
        console.log(body)
        const surveys=await prisma.options.findMany({where:{optionTypeId:parseInt(body)}});

        console.log(surveys)
         return {message:"fetch successful",data:surveys}
    }
    catch(err){
        console.log(err)
        return {message:"fetch failed",data:null}
    } 
}




