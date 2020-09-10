import { Constants } from '../constants/constant';

const getUserNameCacheKey = (username: string) => {
  return `${Constants.UserNamePrefix}_${username}`;
};

const getUserIdCacheKey = (userId: string) => {
  return `${Constants.UserIdPrefix}_${userId}`;
};

const getCountryCacheKey = (searchKey: string) => {
  return `${Constants.CountryPrefix}_${searchKey}`;
};

export {
  getUserNameCacheKey,
  getUserIdCacheKey,
  getCountryCacheKey
};
