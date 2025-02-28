import { FastifyReply, FastifyRequest } from "fastify";
import { Login } from "../services/auth";

export async function LoginUser(req: FastifyRequest, reply: FastifyReply) {
  const { email } = req.body as { email: string;  };
  
  // Call the Login function
  const result = await Login({ email });

  // If login was successful, send a 200 status with the message
  if (result.data) {
     
    
    return reply.status(200).send(result);
  } else {
    // If there was an error, send a 401 Unauthorized status
    return reply.status(401).send(result);
  }
}
