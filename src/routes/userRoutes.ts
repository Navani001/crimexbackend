import { FastifyInstance } from "fastify";
import { Deletequestion, UpdateSurvey } from "../controllers/surveyUpdate";
import { OptionofType, OptionsDatabase, OptionsShow } from "../controllers/options";
import { userController } from "../controllers/userController";




export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/surveys",{
            preHandler: [fastify.authenticate],
        }, userController);

  
}