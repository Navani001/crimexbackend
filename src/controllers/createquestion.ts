import { FastifyReply, FastifyRequest } from "fastify";

import { Question } from "../services/createQuetion";

export async function CreateQuestion(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await Question(user,body);
  console.log(result)

  if (result.data) {
     
    
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
