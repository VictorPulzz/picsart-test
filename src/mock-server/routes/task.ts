import { Response, Server } from 'miragejs';

import { TaskModel } from '~/entities/Task';
import { transformToPagination } from '~/mock-server/paginator';
import { taskTransformer } from '~/mock-server/transformers';

import { AppSchema } from '../types';

export function registerTaskRoutes(context: Server) {
  context.get(`/tasks`, (schema: AppSchema, request) => {
    const tasks = schema.all('task');
    const { data, ...rest } = transformToPagination<TaskModel>(
      taskTransformer(tasks.models),
      request.queryParams,
    );
    return new Response(
      200,
      {},
      {
        data: data.map(item => ({
          id: item.id,
          userId: item.userId,
          description: item.description,
          user: item.user,
        })),
        ...rest,
      },
    );
  });
}
