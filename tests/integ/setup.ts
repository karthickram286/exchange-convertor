process.env.NODE_ENV = 'test';

import { server } from '../../server';
import UserAccessor from '../../lib/accessor/user.accessor';

before(async () => {
  console.log('---- Test suite setup ---');
  console.log = () => {};
});