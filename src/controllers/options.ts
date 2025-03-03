import { FastifyReply, FastifyRequest } from "fastify";
import { Login } from "../services/auth";
import {  createSurvey } from "../services/createsurvey";
import { optionofType, options, optionshow } from "../services/options";

export async function OptionsDatabase(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await options(user,body);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function OptionsShow(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body=req.body;
  const result = await optionshow(user,body);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function OptionofType(req: FastifyRequest, reply: FastifyReply) {
const user=req.user

const body:any=req.params;
const fixedBody = { ...body };
console.log(fixedBody.id); 
  const result = await optionofType(user,fixedBody.id);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
