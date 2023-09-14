import { createServer } from 'miragejs';

import { factories } from './factories';
import { models } from './models';
import { registerPostRoutes } from './routes/posts';
import { registerUserRoutes } from './routes/users';

export function startMockServer() {
  return createServer({
    namespace: 'api',
    models,
    factories,
    seeds(server) {
      server.createList('post', 100);
    },
    routes() {
      registerUserRoutes(this);
      registerPostRoutes(this);
    },
  });
}
