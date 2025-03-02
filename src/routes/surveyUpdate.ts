import { FastifyInstance } from "fastify";
import { Deletequestion, UpdateSurvey } from "../controllers/surveyUpdate";

export async function SurveyUpdate(fastify: FastifyInstance) {
  fastify.post("/delete",{
            preHandler: [fastify.authenticate],
        }, Deletequestion);
fastify.post("/updatequestion",{
            preHandler: [fastify.authenticate],
        }, UpdateSurvey);
  
}