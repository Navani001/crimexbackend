import { FastifyInstance } from "fastify";
import { groupcreate, groupget, roleget, skillget, studentGroup,  } from "../controllers/groupcontroller";

export async function groupRoute(fastify: FastifyInstance) {
fastify.get("/skill",{
            preHandler: [fastify.authenticate],
        }, skillget);
fastify.get("/role",{
            preHandler: [fastify.authenticate],
        }, roleget);
fastify.post("/create",{
            preHandler: [fastify.authenticate],
        }, groupcreate);
fastify.get("/getgroup",{
            preHandler: [fastify.authenticate],
        }, groupget);
  fastify.post("/group/student",{
            preHandler: [fastify.authenticate],
        }, studentGroup);
}