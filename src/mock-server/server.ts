import { createServer } from 'miragejs';

import { factories } from './factories';
import { models } from './models';
import { registerTaskRoutes } from './routes/task';
import { registerUserRoutes } from './routes/user';

export function startMockServer() {
  createServer({
    namespace: 'api',
    models,
    factories,
    seeds(server) {
      server.createList('task', 100);
    },
    routes() {
      registerUserRoutes(this);
      registerTaskRoutes(this);
    },
  });
}
