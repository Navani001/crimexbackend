import { FastifyReply, FastifyRequest } from "fastify";
import { Login } from "../services/auth";

export async function LoginUser(req: FastifyRequest, reply: FastifyReply) {
  const { email } = req.body as { email: string };

  try {
    // Call the Login function
    const result = await Login({ email });

    // If login was successful
    if (result.data) {
      // Set cookie with more comprehensive options
      reply.setCookie('access_token', result.data, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        httpOnly: true,
        secure:true, // only secure in production
        sameSite: 'strict', // helps prevent CSRF
        domain: process.env.COOKIE_DOMAIN || 'localhost', // adjust based on your domain
      });

      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Login successful',
        data: result.data
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