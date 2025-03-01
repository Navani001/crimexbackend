import { FastifyInstance } from "fastify";
import { CreateSurvey } from "../controllers/surveyCreation";
import { CreateQuestion } from "../controllers/createQuestion";

export async function CreationRoute(fastify: FastifyInstance) {
  fastify.post("/create",{
            preHandler: [fastify.authenticate],
        }, CreateSurvey);
fastify.post("/createquestion",{
            preHandler: [fastify.authenticate],
        }, CreateQuestion);
  
}