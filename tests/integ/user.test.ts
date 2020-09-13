// process.env.NODE_ENV = 'test';

import supertest from 'supertest';
import { expect } from 'chai';
import { server } from '../../server';

import UserAccessor from '../../lib/accessor/user.accessor';

describe ('User APIs', () => {

  let username = 'testuser';
  let password = 'password123';

  after(async () => {
    await UserAccessor.deleteUserByName(username);
  });

  describe ('Add User', async () => {

    it ('should add user', async () => {
      const res = await supertest(server)
        .post('/v1/users/add')
        .send({ 
          username: username,
          password: password
        });

      expect(res.status).to.equal(200);
      expect(res.body.username, 'testuser');
    });

    it ('should throw error if same user is added again', async () => {
      const res = await supertest(server)
        .post('/v1/users/add')
        .send({ 
          username: username,
          password: password
        });

      expect(res.status).to.equal(409);
      expect(res.body.message, 'User already exists');
    });

  });
});