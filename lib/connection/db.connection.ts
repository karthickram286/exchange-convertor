import _ from 'lodash';
import { Sequelize } from 'sequelize';
import * as config from '../config/config.json';

const env: any = process.env.NODE_ENV;

/**
 * Sequelize object constructed using the DB configs
 */
const sequelize: Sequelize = new Sequelize(
  _.get(config, `database.${env}.dbname`),
  _.get(config, `database.${env}.username`),
  _.get(config, `database.${env}.password`),
  {
    host: process.env.DB_HOST || _.get(config, `database.${env}.host`),
    dialect: _.get(config, `database.${env}.dialect`),
    logging: (env === 'test' ? false : () => true)
  }
);

/**
 * Establishes a connection with Postgres DB
 */
const connectDB: any = async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB Connection has been established successfully`);
  } catch (error) {
    console.error(`Unable to connect to database: ${error}`);
  }
};

/**
 * Closes the connection with PG
 */
const closeDBConnection: any = async () => {
  console.log(`Closing DB connection`);
  sequelize.close();
};

export {
  connectDB,
  closeDBConnection,
  sequelize
};
