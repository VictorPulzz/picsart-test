import { Response, Server } from 'miragejs';

import { AppSchema } from '../types';

export function registerPostRoutes(context: Server) {
  context.get(`/posts/all`, (schema: AppSchema) => {
    const users = schema.all('post');
    const seconds = new Date().getSeconds();
    return seconds % 17 === 0
      ? new Response(401, {}, { error: true })
      : new Response(200, {}, users);
  });
}
