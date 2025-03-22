import { FastifyInstance } from "fastify";
import { CctvController } from "../controllers/cctv";
export async function CctvRoutes(fastify: FastifyInstance) {
  fastify.get("/", CctvController);
}