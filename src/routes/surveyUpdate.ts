import { FastifyInstance } from "fastify";
import { UpdateSurvey } from "../controllers/surveyUpdate";

export async function SurveyUpdate(fastify: FastifyInstance) {
//   fastify.post("/update",{
//             preHandler: [fastify.authenticate],
//         }, CreateSurvey);
fastify.post("/updatequestion",{
            preHandler: [fastify.authenticate],
        }, UpdateSurvey);
  
}