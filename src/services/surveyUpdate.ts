import prisma from "../lib/prisma";

export async function updateSurvey(userdata: any, body: any) {
  if (!body) {
    console.log("No data provided");
    return { message: "data is required", data: null };
  }
  
  try {
    const surveyQuestionId = body.surveyQuestionId;
    const updatedOptions = body.options;
    
    // First get the existing question with options
    const existingQuestion = await prisma.surveyQuestion.findFirst({
      where: { id: surveyQuestionId },
      include: {
        optionsQuestions: {
          include: { option: true }
        },
      }
    });
    
    if (!existingQuestion) {
      return { message: "Question not found", data: null };
    }
    
    console.log("existing options ", existingQuestion.optionsQuestions);
  
    const updatedQuestion = await prisma.surveyQuestion.update({
      where: { id: surveyQuestionId },
      data: {
        questionTypeId: body.questionTypeId,
        question: body.question,
        optionTypeId: body.optionTypeId,
        isOther: body.isOther !== undefined ? body.isOther : existingQuestion.isOther,
        isActive: body.isActive !== undefined ? body.isActive : existingQuestion.isActive,
        isMultiple: body.isMultiple !== undefined ? body.isMultiple : existingQuestion.isMultiple,
      }
    });
    
    // Handle option changes based on the request type and existing options type
    const existingOptionsType = existingQuestion.optionsQuestions.length > 0 && 
                               existingQuestion.optionsQuestions[0].option.isPredefined ? "pre" : "def";
    console.log(existingOptionsType)
    // Check for option type change
    if (existingOptionsType !== body.optionsType) {
      // Option type has changed (predefined ↔ user-defined)
      // Delete all existing option mappings
      await prisma.optionsQuestion.deleteMany({
        where: { questionId: surveyQuestionId }
      });
      
      if (body.optionsType === "pre") {
        // Changed from user-defined to predefined
        // Create new mappings for predefined options
        await prisma.optionsQuestion.createMany({
          data: updatedOptions.map((item: any) => ({
            optionId: item.id,
            questionId: surveyQuestionId
          }))
        });
      } else {
        // Changed from predefined to user-defined
        // Create new user-defined options and map them
        const optionPromises = updatedOptions.map(async (item: any) => {
          const newOption = await prisma.options.create({
            data: {
              name: item.name,
              optionTypeId: body.optionTypeId,
              isPredefined: false
            }
          });
          
          return prisma.optionsQuestion.create({
            data: {
              questionId: surveyQuestionId,
              optionId: newOption.id
            }
          });
        });
        
        await Promise.all(optionPromises);
      }
    } else {
      // Option type remains the same, but options might have changed
      if (body.optionsType === "pre") {
        // Handle predefined options changes
        // Get current option IDs
        console.log("hello")
        const currentOptionIds = existingQuestion.optionsQuestions.map(oq => oq.optionId);
        const newOptionIds = updatedOptions.map((item: any) => item.id);
        
        // Find options to remove
        const optionsToRemove = currentOptionIds.filter(id => !newOptionIds.includes(id));
        
        // Find options to add
        const optionsToAdd = newOptionIds.filter((id:any) => !currentOptionIds.includes(id));
        console.log(optionsToAdd)
        console.log(optionsToRemove)
        // Remove options
        if (optionsToRemove.length > 0) {
          await prisma.optionsQuestion.deleteMany({
            where: {
              questionId: surveyQuestionId,
              optionId: { in: optionsToRemove }
            }
          });
        }
        
        // Add new options
        if (optionsToAdd.length > 0) {
          await prisma.optionsQuestion.createMany({
            data: optionsToAdd.map((optionId:any) => ({
              optionId,
              questionId: surveyQuestionId
            }))
          });
        }
      } else {
        // Handle user-defined options changes
        // For user-defined options, easiest approach is to delete all and recreate
        // First, get existing option IDs
        const existingOptionIds = existingQuestion.optionsQuestions.map(oq => oq.optionId);
        
        // Delete all existing mappings
        await prisma.optionsQuestion.deleteMany({
          where: { questionId: surveyQuestionId }
        });
        
        // Create or update options
        const optionPromises = updatedOptions.map(async (item: any) => {
          if (item.id) {
            // Update existing option
            await prisma.options.update({
              where: { id: item.id },
              data: {
                name: item.name
              }
            });
            
            return prisma.optionsQuestion.create({
              data: {
                questionId: surveyQuestionId,
                optionId: item.id
              }
            });
          } else {
            // Create new option
            const newOption = await prisma.options.create({
              data: {
                name: item.name,
                optionTypeId: body.optionTypeId,
                isPredefined: false
              }
            });
            
            return prisma.optionsQuestion.create({
              data: {
                questionId: surveyQuestionId,
                optionId: newOption.id
              }
            });
          }
        });
        
        await Promise.all(optionPromises);
        
        // Mark any unused user-defined options as deleted
        const newOptionIds = (await prisma.optionsQuestion.findMany({
          where: { questionId: surveyQuestionId }
        })).map(oq => oq.optionId);
        
        const optionsToDelete = existingOptionIds.filter(id => !newOptionIds.includes(id));
        
        // For each option, check if it's used elsewhere before deleting
        for (const optionId of optionsToDelete) {
          const option = await prisma.options.findUnique({
            where: { id: optionId }
          });
          
          // Only process user-defined options
          if (option && !option.isPredefined) {
            const isUsedElsewhere = await prisma.optionsQuestion.findFirst({
              where: {
                optionId,
                NOT: { questionId: surveyQuestionId }
              }
            });
            
            if (!isUsedElsewhere) {
              await prisma.options.update({
                where: { id: optionId },
                data: { isDeleted: true }
              });
            }
          }
        }
      }
    }
    
    // Get updated question with options
    const finalQuestion = await prisma.surveyQuestion.findFirst({
      where: { id: surveyQuestionId },
      include: {
        optionsQuestions: {
          include: { option: true }
        }
      }
    });
    
    return { message: "Update successful", data: finalQuestion };
  } catch (err) {
    console.log(err);
    return { message: "Update failed", data: null, error: err };
  }
}