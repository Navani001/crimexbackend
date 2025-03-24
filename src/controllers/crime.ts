import { FastifyReply, FastifyRequest } from "fastify";
import { getAllCrime } from "../services/crimes";
import { CreateCrime } from "../services/crimeCreate";
import { CrimeSpot } from "../services/crimeSpot";
import { HighCrime } from "../services/highCrime";
import { PoliceLocaation } from "../services/policeLocation";

export async function CrimeAllController(req: FastifyRequest, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    const result = await getAllCrime(req.body);

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
export async function CrimeSpotController(req: any, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    console.log(req.user.payload)
    const result = await CrimeSpot(req.body,req.user.payload);

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
export async function PoliceLocaationController(req: any, reply: FastifyReply) {
  try {

    const result = await PoliceLocaation();

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
export async function HighCrimeController(req: any, reply: FastifyReply) {
  try {
    console.log("testing for crime creation")
    // Call the Login function
    console.log(req.user.payload)
    const result = await HighCrime();

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
export async function CreateCrimeController(req: any, reply: FastifyReply) {
  try {

    console.log(req.body)
    // Call the Login function
    const result = await CreateCrime(req.body,req.user.payload);
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
export async function CreateCrimeStatusController(req: any, reply: FastifyReply) {
  try {

  const result = await CrimeSpot(req.body,req.user.payload);
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