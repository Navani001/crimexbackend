import { FastifyInstance } from "fastify";
import { CreateCrimeController, CreateCrimeStatusController, CrimeAllController, CrimeSpotController, HighCrimeController, PoliceLocaationController } from "../controllers/crime";
import { CCtvAssignController, PoliceAssignController } from "../controllers/assign";
import { RecommendationController } from "../controllers/recommend";
import { HighCrimeCreateController } from "../controllers/highCrime";
export async function CrimeRoutes(fastify: FastifyInstance) {
  fastify.post("/", CrimeAllController);
  fastify.post("/create/high",{preHandler:fastify.authenticate}, HighCrimeCreateController);

  fastify.post("/create",{preHandler:fastify.authenticate}, CreateCrimeController);
  fastify.post("/spotPolice",{preHandler:fastify.authenticate}, CrimeSpotController);
  fastify.post("/spotPolice/status",{preHandler:fastify.authenticate}, CreateCrimeStatusController);
 fastify.get("/high", HighCrimeController);
 fastify.get("/policeLocation", PoliceLocaationController);
 fastify.post("/assign/police",{preHandler:fastify.authenticate}, PoliceAssignController);
  fastify.post("/assign/cctv",{preHandler:fastify.authenticate}, CCtvAssignController);
  fastify.get("/recommendation", RecommendationController);

}