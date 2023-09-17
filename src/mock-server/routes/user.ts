import { Response, Server } from 'miragejs';

import { UserModel } from '~/entities/User';
import { transformToPagination } from '~/mock-server/paginator';
import { userTransformer } from '~/mock-server/transformers';

import { AppSchema } from '../types';

export function registerUserRoutes(context: Server) {
  context.get(`/users`, (schema: AppSchema, request) => {
    const users = schema.all('user');
    return new Response(
      200,
      {},
      transformToPagination<UserModel>(userTransformer(users.models), request.queryParams, [
        'firstName',
        'lastName',
        'email',
      ]),
    );
  });
  context.post(`/users`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const user = schema.create('user', attrs);
    return new Response(200, {}, user);
  });
  context.get(`/users/all`, (schema: AppSchema) => {
    const users = schema.all('user');
    return new Response(200, {}, users);
  });
}
