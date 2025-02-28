
import fastify from './src/middleware/jwt';
import {  LoginUserRoute } from './src/routes/auth';

fastify.get('/',{
            preHandler: [fastify.authenticate],
        }, async (request:any, reply:any) => {
  return { hello: 'world' }
})

//j
fastify.get('/jwt', async (request:any, reply:any) => {
  return { hello: 'world' }
})
fastify.register(LoginUserRoute,{prefix:"/api/auth"})
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()