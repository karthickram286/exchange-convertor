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

  let errorMessage = await _verifyToken(token);
  if (errorMessage !== true)
    return res.status(401)
      .json({ message: errorMessage}); 

  next();
};

/**
 * @desc Decodes the id from token and verifies in DB
 * @param token 
 */
const _verifyToken = async (token: string) => {

  try {
    const decoded = jwt.verify(token, jwtPrivatekey);
    let decodedId = _.get(decoded, 'id');

    let isUserExists = await _isUserExist(decodedId);
    if (!isUserExists) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return error.message;
  }
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