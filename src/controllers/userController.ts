import { FastifyReply, FastifyRequest } from "fastify";

import { Question } from "../services/createquetion";
import { questionmatrix } from "../services/questionmatrix";
import { userSurvey } from "../services/userSurvey";

export async function userController(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await userSurvey(user,body);
  console.log(result)

  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}


