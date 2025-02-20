import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import UserRoutes from './routes/user.routes.js';

const fastify = Fastify({ logger: true });

fastify.register(fastifyMultipart);

const userRoutes = new UserRoutes();

fastify.register(userRoutes.routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3333 });
    console.log('Server listening on port 3333');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();