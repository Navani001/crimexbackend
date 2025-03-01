import { FastifyInstance } from "fastify";
import { CreateSurvey } from "../controllers/surveycreation";
import { CreateQuestion } from "../controllers/createquestion";

export async function CreationRoute(fastify: FastifyInstance) {
  fastify.post("/create",{
            preHandler: [fastify.authenticate],
        }, CreateSurvey);
        fastify.post("/createquestion",{
            preHandler: [fastify.authenticate],
        }, CreateQuestion);
  
}