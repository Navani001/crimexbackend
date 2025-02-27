import { FastifyReply, FastifyRequest } from "fastify";
import { getAllUsers, addUser } from "../services/userService";

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await getAllUsers();
  return reply.send(users);
}

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const { name, email } = req.body as { name: string; email: string };
  const user = await addUser(name, email);
  return reply.status(201).send(user);
}
