import { FastifyReply, FastifyRequest } from "fastify";
import { getAllCrime } from "../services/crimes";
import { CreateCrime } from "../services/crimeCreate";
import { CrimeSpot } from "../services/crimeSpot";
import { CctvAssign } from "../services/cctvAssign";
import { PoliceAssign } from "../services/PoliceAssign";

export async function PoliceAssignController(req: any, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    const result = await PoliceAssign(req.body,req.user.payload);

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
export async function CCtvAssignController(req: any, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    console.log(req.user.payload)
    const result = await CctvAssign(req.body);

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