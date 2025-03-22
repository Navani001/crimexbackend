import { FastifyInstance } from "fastify";
import { CreateCrimeController, CrimeAllController } from "../controllers/crime";
export async function CrimeRoutes(fastify: FastifyInstance) {
  fastify.post("/", CrimeAllController);
  fastify.post("/create", CreateCrimeController);

}