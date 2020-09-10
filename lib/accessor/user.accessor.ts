import _ from 'lodash';

import UserModel from '../model/user.model';
import { getFromCache } from '../manager/cache.manager';
import { getUserNameCacheKey, getUserIdCacheKey } from '../util/cacheKey'; 

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
    let cacheKey = getUserNameCacheKey(username);

    let result = await getFromCache(cacheKey, async () => {
      return await UserModel.findOne({
        where: {
          username: username
        }
      });
    });

    return result;
  };

  /**
   * Retuns the user object for a given id
   * 
   * @param userId
   */
  static getUserById = async (userId: string) => {
    let cacheKey = getUserIdCacheKey(userId);

    let result = await getFromCache(cacheKey, async () => {
      return await UserModel.findOne({
        where: {
          id: userId
        }
      })
    });

    return result;
  };
}

export default UserAccessor;