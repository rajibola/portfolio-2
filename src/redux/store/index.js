import {init} from '@rematch/core';
import logger from 'redux-logger';
import {persistPlugin} from '../persist';
import {loadingPlugin} from '../plugins';

import * as models from '../models';

const store = init({
  models,
  plugins: [loadingPlugin, persistPlugin],
  redux: {
    middlewares: [logger],
  },
});
export default store;
