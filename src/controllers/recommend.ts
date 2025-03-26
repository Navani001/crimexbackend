import { FastifyReply, FastifyRequest } from "fastify";
import { Recommendation } from "../services/recommendation";

export async function RecommendationController(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Call the Login function
    const result = await Recommendation();

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
