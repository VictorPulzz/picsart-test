import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { UserModel } from '~/entities/User';

export const userFactory = Factory.extend<UserModel>({
  id(i) {
    return i;
  },
  firstName() {
    return faker.person.firstName();
  },
  lastName() {
    return faker.person.lastName();
  },
  email() {
    return faker.internet.email({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });
  },
  address() {
    return faker.location.country();
  },
  dob() {
    return faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toString();
  },
  avatar() {
    return faker.internet.avatar();
  },
});
