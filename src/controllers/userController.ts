import { FastifyReply, FastifyRequest } from "fastify";

import { Question } from "../services/createquetion";
import { questionmatrix } from "../services/questionmatrix";
import { userSurvey } from "../services/userSurvey";
import { questionregister, surveyregister, surveyview } from "../services/userRegister";

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
export async function registerSurvey(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await surveyregister(user,body);
  console.log(result)

  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}

export async function registerquestion(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await questionregister(user,body);
  console.log(result)

  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function surveyView(req: FastifyRequest, reply: FastifyReply) {
const user=req.user

const params:any=req.params;
const fixedBody = { ...params };
  const result = await surveyview(user,fixedBody.id );
  console.log(result)

  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}