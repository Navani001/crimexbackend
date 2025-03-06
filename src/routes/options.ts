import { FastifyInstance } from "fastify";
import { Deletequestion, UpdateSurvey } from "../controllers/surveyUpdate";
import { OptionofType, OptionsDatabase, OptionsShow, QuestionOptions } from "../controllers/options";




export async function Options(fastify: FastifyInstance) {
  fastify.get("/options",{
            preHandler: [fastify.authenticate],
        }, OptionsDatabase);
fastify.get("/optionsShow",{
            preHandler: [fastify.authenticate],
        }, OptionsShow);
        fastify.get("/questionoptionsShow",{
            preHandler: [fastify.authenticate],
        }, QuestionOptions);
    fastify.get("/options/:id",{
            preHandler: [fastify.authenticate],
        }, OptionofType);
  
}