import { DataTypes } from 'sequelize';

import { sequelize } from '../connection/db.connection';

const User = sequelize.define('User', {

  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
});

export default User;