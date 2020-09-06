import express from 'express';
import _ from 'lodash';

import * as config from './lib/config/config.json';
import { connectDB, closeDBConnection } from './lib/connection/db.connection';
import { connectRedis } from './lib/connection/redis.connection';
import UserRouter from './lib/routes/user.routes';
import AuthRouter from './lib/routes/auth.routes';
import CountryRouter from './lib/routes/country.routes';
import { authorize } from './lib/middleware/authorize.middleware';
import { rateLimiter } from './lib/middleware/rateLimiter.middleware';

const app: any = express();
const env: string = _.get(config, 'service.env');
const PORT: any = process.env.PORT || _.get(config, `service.port.${env}`);

app.use(express.json());

const jwtPrivateKey: any = process.env.JWT_PRIVATE_KEY;
if (_.isEmpty(jwtPrivateKey)) {
  console.log(`JWT private key is not configured. Exiting application...`);
  process.exit(1);
};

/**
 * Connecting to DB
 */
connectDB();

/**
 * Connecting to Redis
 */
connectRedis();

/**
 * Routers registration
 */
app.use('/v1/users', UserRouter);
app.use('/v1/auth', AuthRouter);
app.use('/v1/country', authorize, rateLimiter, CountryRouter);

/**
 * Starting the server
 */
let server: any = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

/**
 * Closing the server on ctrl+c
 */
process.on('SIGINT', () => {
  console.log(`Terminating the application gracefully`);
  closeDBConnection()
  process.exit(1);
});

/**
 * Terminating the process on Uncaught Exception
 */
process.on('uncaughtException', error => {
  console.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
  process.exit(1);
});

/**
 * Handling Unhandled Rejection
 */
process.on('unhandledRejection', (reason) => {
  throw reason;
});

export {
  server
};