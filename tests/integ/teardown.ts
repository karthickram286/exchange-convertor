import { server } from '../../server';
import UserAccessor from '../../lib/accessor/user.accessor';
import { closeDBConnection } from '../../lib/connection/db.connection';


after(async () => {
  console.log('---- Test suite teardown ---');
  closeDBConnection();
});