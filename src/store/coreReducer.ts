import { combineReducers } from 'redux';

import { rtkQuery } from '~/core/api';

export const coreReducer = combineReducers({
  [rtkQuery.reducerPath]: rtkQuery.reducer,
});
