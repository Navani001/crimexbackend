
import fastify from './src/middleware/jwt';
import {  LoginUserRoute } from './src/routes/auth';
import { groupRoute } from './src/routes/groupRoute';
import { Options } from './src/routes/options';
import { CreationRoute } from './src/routes/surveycreation';
import { SurveyUpdate } from './src/routes/surveyUpdate';
import { userRoutes } from './src/routes/userRoutes';

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
fastify.register(CreationRoute,{prefix:"/api/survey"})
fastify.register(SurveyUpdate,{prefix:"/api/surveyupdate"})
fastify.register(Options,{prefix:"/api/options"})
fastify.register(groupRoute,{prefix:"/api/group"})
fastify.register(userRoutes,{prefix:"/api/user"})
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()