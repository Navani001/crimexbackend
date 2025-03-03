import { FastifyReply, FastifyRequest } from "fastify";

import { getsurvey } from "../services/getSurvey";
import { getallsurvey } from "../services/getSurveyAll";

export async function surveyGet(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.params;
const fixedBody = { ...body };
console.log(fixedBody.id); 
  const result = await getsurvey(user,fixedBody.id);
  console.log("Hi")
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}


export async function surveyGetAll(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.params;
const fixedBody = { ...body };
console.log(fixedBody.type); 
  const result = await getallsurvey(user,fixedBody.type);
  console.log("Hi")
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
