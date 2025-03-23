import { FastifyInstance } from "fastify";
import { CreateCrimeController, CreateCrimeStatusController, CrimeAllController, CrimeSpotController } from "../controllers/crime";
export async function CrimeRoutes(fastify: FastifyInstance) {
  fastify.post("/", CrimeAllController);
  fastify.post("/create",{preHandler:fastify.authenticate}, CreateCrimeController);
  fastify.post("/spotPolice",{preHandler:fastify.authenticate}, CrimeSpotController);
  fastify.post("/spotPolice/status",{preHandler:fastify.authenticate}, CreateCrimeStatusController);


}