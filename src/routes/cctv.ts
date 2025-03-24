import { FastifyInstance } from "fastify";
import { CctvController, CreateCCTvController } from "../controllers/cctv";
export async function CctvRoutes(fastify: FastifyInstance) {
  fastify.get("/", CctvController);
    fastify.post("/create",{preHandler:fastify.authenticate}, CreateCCTvController);
}