import _ from 'lodash';

import UserModel from '../model/user.model';

class UserAccessor {

  /**
   * Creates User model
   * 
   * @param user 
   */
  static createUser = async (user: any) => {
    return await UserModel.create(user);
  };

  /**
   * Adds the user object to DB
   * 
   * @param user model
   */
  static addUser = async (user: any) => {  
    if (user instanceof UserModel) {
      await user.save();
    } else {
      throw new Error('Passed object is not of the type User');
    }
  };

  /**
   * Returns the user object for a given username
   * 
   * @param username 
   */
  static getUser = async (username: string) => {
    let result = await UserModel.findOne({
      where: {
        username: username
      }
    });

    return result;
  };

  /**
   * Retuns the user object for a given id
   * 
   * @param userId
   */
  static getUserById = async (userId: string) => {
    let result = await UserModel.findOne({
      where: {
        id: userId
      }
    });

    return result;
  };

  static deleteUserByName = async (username: string) => {
    await UserModel.destroy({
      where: {
        username: username
      }
    });
  };
}

export default UserAccessor;