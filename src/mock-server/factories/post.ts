import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { PostModel } from '~/entities/Post/model';

export const postFactory = Factory.extend<PostModel>({
  id(i) {
    return i;
  },
  text() {
    return faker.lorem.paragraph(4);
  },
  createdAt() {
    return faker.date.recent().toString();
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  afterCreate(post, server) {
    post.update({
      user: server.create('user'),
    });
  },
});
