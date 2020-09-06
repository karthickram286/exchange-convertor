import _ from 'lodash';
import { Sequelize } from 'sequelize';
import * as config from '../config/config.json';

const env: string = _.get(config, 'service.env');

/**
 * Sequelize object constructed using the DB configs
 */
const sequelize: Sequelize = new Sequelize(
  _.get(config, `database.${env}.dbname`),
  _.get(config, `database.${env}.username`),
  _.get(config, `database.${env}.password`),
  {
    host: _.get(config, `database.${env}.host`),
    dialect: _.get(config, `database.${env}.dialect`)
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
