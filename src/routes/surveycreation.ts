import { FastifyInstance } from "fastify";
import { CreateSurvey } from "../controllers/surveycreation";
import { CreateQuestion } from "../controllers/createquestion";
import { surveyGet, surveyGetAll } from "../controllers/getSurvey";

export async function CreationRoute(fastify: FastifyInstance) {
  fastify.post("/create",{
            preHandler: [fastify.authenticate],
        }, CreateSurvey);
fastify.post("/createquestion",{
            preHandler: [fastify.authenticate],
        }, CreateQuestion);
        fastify.get("/get/:id",{
            preHandler: [fastify.authenticate],
        }, surveyGet);
     fastify.get("/getall/:type",{
            preHandler: [fastify.authenticate],
        }, surveyGetAll);
  
}