import { configureStore } from '@reduxjs/toolkit';

import { rtkQuery } from '~/core/api';

import { coreReducer } from './coreReducer';

export const store = configureStore({
  reducer: coreReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rtkQuery.middleware),
});
