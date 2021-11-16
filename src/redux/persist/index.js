import React from 'react';
import createRematchPersist from '@rematch/persist';
import {AllFilters} from '../filters';
import storage from 'redux-persist/lib/storage';

const blacklist = [];
export const persistPlugin = createRematchPersist({
  key: 'primary',
  whitelist: [''],
  blacklist,
  throttle: 3000,
  version: 2,
  storage,
  transforms: AllFilters,
});
