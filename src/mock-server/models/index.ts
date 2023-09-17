import { belongsTo, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

import { TaskModel } from '~/entities/Task/model';
import { UserModel } from '~/entities/User';

const UserDefModel: ModelDefinition<UserModel> = Model.extend({});
const TaskDefModel: ModelDefinition<TaskModel> = Model.extend({
  user: belongsTo(),
});

export const models = {
  user: UserDefModel,
  task: TaskDefModel,
};
