import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { RequestHandler } from 'express';
import UserAccessor from '../accessor/user.accessor';

const jwtPrivatekey: any = process.env.JWT_PRIVATE_KEY;

const authorize: RequestHandler = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(403)
      .json({ message: `Auth token not provided` });
  }

  if(!_verifyToken(token)) {
    return res.status(401)
      .json({ message: `Invalid Token`});
  }

  next();
};

/**
 * @desc Decodes the id from token and verifies in DB
 * @param token 
 */
const _verifyToken = async (token: string) => {

  const decoded = jwt.verify(token, jwtPrivatekey);
  let decodedId = _.get(decoded, 'id');

  let isUserExists = await _isUserExist(decodedId);
  if (!isUserExists) {
    return false;
  }
  return true;
};

/**
 * @desc Checks whether user exist or not for an id
 * @param id 
 */
const _isUserExist = async (id: string) => {
  const user = await UserAccessor.getUserById(id);
  return !_.isEmpty(user);
};

export {
  authorize
};