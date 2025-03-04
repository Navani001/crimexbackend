import { FastifyInstance } from "fastify";
import { registerquestion, registerSurvey, surveyView, userController } from "../controllers/userController";





export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/surveys",{
            preHandler: [fastify.authenticate],
        }, userController);

   fastify.post("/register/survey",{
            preHandler: [fastify.authenticate],
        }, registerSurvey);

  fastify.post("/register/question",{
            preHandler: [fastify.authenticate],
        }, registerquestion);
    fastify.get("/registered/survey/view/:id",{
            preHandler: [fastify.authenticate],
        }, surveyView);

}