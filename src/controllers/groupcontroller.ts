import { FastifyReply, FastifyRequest } from "fastify";

import { getsurvey } from "../services/getSurvey";
import { getrole, getskill } from "../services/groupservice";
import { groupcreation } from "../services/groupcreate";
import { groupgetBackend } from "../services/groupgetBackend";
import { studentgroup } from "../services/studentgroup";

export async function skillget(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.params;
 
  const result = await getskill(user,body);
  console.log("Hi")
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}

export async function roleget(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.params;
 
  const result = await getrole(user,body);
  console.log("Hi")
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function groupcreate(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.body;
 
  const result = await groupcreation(user,body);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function groupget(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.body;
 
  const result = await groupgetBackend(user,body);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}
export async function studentGroup(req: FastifyRequest, reply: FastifyReply) {
const user=req.user
const body:any=req.body;
 
  const result = await studentgroup(user,body);
  console.log(result)
  if (result.data) {
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(500).send(result);
  }
}