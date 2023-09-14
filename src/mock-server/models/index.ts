import { belongsTo, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

import { PostModel } from '~/entities/Post/model';
import { UserModel } from '~/entities/User';

const UserDefModel: ModelDefinition<UserModel> = Model.extend({});
const PostDefModel: ModelDefinition<PostModel> = Model.extend({
  user: belongsTo(),
});

export const models = {
  user: UserDefModel,
  post: PostDefModel,
};
