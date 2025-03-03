import { FastifyInstance } from "fastify";
import { roleget, skillget } from "../controllers/groupcontroller";

export async function groupRoute(fastify: FastifyInstance) {
fastify.get("/skill",{
            preHandler: [fastify.authenticate],
        }, skillget);
fastify.get("/role",{
            preHandler: [fastify.authenticate],
        }, roleget);
  
}