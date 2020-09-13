import bcrypt from 'bcrypt';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { RequestHandler } from 'express';

import UserAccessor from '../accessor/user.accessor';

class UserController {

  /**
   * @desc Adds a new user if it didn't already exists
   * 
   * @scope public
   * @param request
   * @param response
   */
  add: RequestHandler = async (req, res) => {
    let { username, password } = req.body;
  
    let isUserExist = await this._checkUser(username);
    if (isUserExist) {
      return res.status(409)
        .json({ message: `User already exists` });
    }

    let userObj = await this._createUserObject(username, password);
    await UserAccessor.addUser(userObj);
    return res.status(200)
      .json({
        message: `User created`,
        id: _.get(userObj, 'id')
      });
  }

  /**
   * @desc Encrypts the given password
   * 
   * @scope private
   * @param password 
   */
  _getEncryptedPassword = async (password: string): Promise<string> => {

    let salt: string = await bcrypt.genSalt(6);
    let encryptedPassword: string = await bcrypt.hash(password, salt);
  
    return encryptedPassword;
  };

  /**
   * @desc Creates an User object
   * 
   * @scope private
   * @param username 
   * @param password 
   */
  _createUserObject = async (username: string, password: string) => {
    let id: string = uuidv4();
    let userObj = {
      id: id,
      username: username,
      password: await this._getEncryptedPassword(password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let user = await UserAccessor.createUser(userObj);
    return user;
  };

  /**
   * @desc Checks whether the user is already available. Retuns true if it exists and vice versa
   * 
   * @scope private
   * @param username 
   */
  _checkUser = async (username: string): Promise<boolean> => {
    let user = await UserAccessor.getUser(username);
    return !_.isEmpty(user);
  };
}

export default UserController;