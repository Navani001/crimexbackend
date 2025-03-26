import { FastifyReply } from "fastify";
import { HighCrime } from "../services/highCrime";
import { HighCrimeCreate } from "../services/highCrimeCreate";

export async function HighCrimeCreateController(req: any, reply: FastifyReply) {
  try {

    console.log(req.body)
    // Call the Login function
    const result = await HighCrimeCreate(req.body);
console.log(result);
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
    console.log(error)
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}