import { FastifyReply, FastifyRequest } from "fastify";

import { getsurvey } from "../services/getSurvey";
import { getrole, getskill } from "../services/groupservice";

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
