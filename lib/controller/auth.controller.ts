import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import UserAccessor from '../accessor/user.accessor';

class AuthController {

  /**
   * @desc Checks the username and password and returns Authtoken
   * 
   * @scope Public
   * @param req 
   * @param res 
   */
  login: RequestHandler = async (req, res) => {
    
    let { username, password } = req.body;

    let user = await this._getUser(username);

    // If the user is not present
    if (!user) {
      return res.status(404)
        .json(`Invalid email or password`);
    }

    // If the entered password didn't match
    let isValidPassword = await this._validatePassword(password, _.get(user, 'password'));
    if (!isValidPassword) {
      return res.status(404)
        .json(`Invalid email or password`);
    }

    let userId = _.get(user, 'id');
    let token = this._getJWT(userId);
    return res.json({
      authToken: token,
      user_id: userId
    })
  }

  /**
   * @desc Returns the user object if it's available for a given username
   * 
   * @scope private
   * @param username 
   */
  _getUser = async (username: string) => {
    let user = await UserAccessor.getUser(username);
    return user;
  };

  /**
   * @desc Validates the entered password with the user's password
   * 
   * @scope private
   * @param password 
   * @param user_password 
   */
  _validatePassword = async (password: string, user_password: string) => {
    return await bcrypt.compare(password, user_password);
  };

  /**
   * @desc Returns the JWT for the given ID
   * 
   * @scope private
   * @param id 
   */
  _getJWT = (id: any) => {
    const jwtPrivateKey: any = process.env.JWT_PRIVATE_KEY;

    return jwt.sign({
      id: id
    }, jwtPrivateKey, {
      expiresIn: '12h'    // JWT will expire in 12 hours
    });
  };
}

export default AuthController;