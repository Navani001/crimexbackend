import { FastifyReply, FastifyRequest } from "fastify";
import { createCCTVs, getAllCCTVs } from "../services/cctv";

export async function CctvController(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Call the Login function
    const result = await getAllCCTVs();

    // If login was successful
    if (result) {
      
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Login successful',
        data: result
      });
    } else {
      // If there was an error during login
      return reply.status(401).send({
        success: false,
        message: 'Login failed',
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}


export async function CreateCCTvController(req: any, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    console.log("hello")
    console.log(req.user.payload)
    const result = await createCCTVs(req.body,req.user.payload);

    // If login was successful
    if (result) {
      
      // Send success response
      return reply.status(200).send({
        success: true,
        data: result
      });
    } else {
      // If there was an error during login
      return reply.status(401).send({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}