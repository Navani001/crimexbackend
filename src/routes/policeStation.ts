import { FastifyInstance } from "fastify";
import { PoliceStationsController } from "../controllers/policeSation";
export async function PoliceStationsRoutes(fastify: FastifyInstance) {
  fastify.get("/policeStation", PoliceStationsController);
}