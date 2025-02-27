import Fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from './middleware/validate';
import { userRoutes } from "./routes/userRoutes";
const fastify = Fastify();
fastify.register(cors);
fastify.register(jwtPlugin);
fastify.get("/", async () => {
  return { message: "Fastify + Prisma + TypeScript API" };
});
fastify.register(userRoutes, { prefix: '/api/users' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
 