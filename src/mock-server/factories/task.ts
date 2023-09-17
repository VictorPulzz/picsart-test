import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { TaskModel } from '~/entities/Task/model';

export const taskFactory = Factory.extend<TaskModel>({
  id(i) {
    return i + 1;
  },
  description() {
    return faker.lorem.paragraph(4);
  },
  createdAt() {
    return faker.date.recent().toString();
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  afterCreate(task, server) {
    task.update({
      user: server.create('user'),
    });
  },
});
