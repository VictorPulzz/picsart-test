import { Response, Server } from 'miragejs';

import { transformToPagination } from '~/mock-server/paginator';

import { AppSchema } from '../types';

export function registerUserRoutes(context: Server) {
  context.get(`/users`, (schema: AppSchema, request) => {
    const users = schema.all('user');
    return new Response(200, {}, transformToPagination<'user'>(users.models, request.queryParams));
  });
  context.get(`/users/all`, (schema: AppSchema) => {
    const users = schema.all('user');
    return new Response(200, {}, users);
  });
}
