
import prisma from "../lib/prisma";
export async function questionmatrix(userdata:any,body:any) {
    console.log(body)
    const options=body.options
    const col=body.columns
    console.log("hi")
    try{
      const question =await prisma.surveyQuestion.create({data:{
        questionTypeId:body.questionTypeId,
        surveyId:body.surveyId,
        question:body.question,
        optionTypeId:body.optionTypeId
      }})
if(body.optionsType=='pre'){
  const createdOptions= await prisma.optionsQuestion.createMany(
    {data:options.map((item:any)=>
    ({optionId:item.id,questionId:question.id}))
  })
  console.log(createdOptions)
}else{
  options.map(async (item:any)=>{
   const temp=await prisma.options.create({data:{name:item.name,optionTypeId:body.optionTypeId,isPredefined:false}})
   console.log(temp)
    const temp2=await prisma.optionsQuestion.create({data:{questionId:question.id,optionId:temp.id}})
    console.log(temp2)
  })
} 
await prisma.matrixColumn.createMany({data:col.map((item:any)=>({columnName:item.name,questionId:question.id}))})
    return {message:"Question created successfully", data:question}
    }catch(err){
console.log(err)
  return {message:"Creation failed",data:null}
    }
}




