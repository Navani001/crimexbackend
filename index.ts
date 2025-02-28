const fastify = require('fastify')();
const PORT = 4000;

fastify.get('/', async (req:any, reply:any) => {
  return { message: 'Welcome, your app is working well' };
});

fastify.listen(PORT, (err:any, address:any) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});

// Export the Fastify API
module.exports = fastify;
