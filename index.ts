
import fastify from './src/middleware/jwt';
import {  LoginUserRoute } from './src/routes/auth';
import { CctvRoutes } from './src/routes/cctv';
import { CrimeRoutes } from './src/routes/crime';
import { PoliceStationsRoutes } from './src/routes/policeStation';

fastify.get('/',{
            preHandler: [fastify.authenticate],
        }, async (request:any, reply:any) => {
  return { hello: 'world' }
})
fastify.get('/jwt', async (request:any, reply:any) => {
  console.log("Hi")
  return reply.status(200).send({ hello: 'world' })
})
fastify.register(LoginUserRoute,{prefix:"/api/auth"})
fastify.register(PoliceStationsRoutes,{prefix:"/api/police"})
fastify.register(CctvRoutes,{prefix:"/api/cctv"})
fastify.register(CrimeRoutes,{prefix:"/api/crime"})



const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()