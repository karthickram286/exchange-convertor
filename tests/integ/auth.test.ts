process.env.NODE_ENV = 'test';

import supertest from 'supertest';
import { expect } from 'chai';
import { server } from '../../server';

import UserAccessor from '../../lib/accessor/user.accessor';

describe ('Auth APIs', () => {

  let username = 'testuser';
  let password = 'password123';

  after(async () => {
    await UserAccessor.deleteUserByName(username);
  });

  describe ('User login', async () => {

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

    it ('should return authtoken on user login', async () => {
      
      const res = await supertest(server)
        .post('/v1/auth/login')
        .send({ 
          username: username,
          password: password
        });

        expect(res.status).to.equal(200);
        expect(res.body.authToken).to.not.empty;
        expect(res.body.user_id).to.not.empty;
    });

    it ('should return invalid email/password if user is not present', async () => {

      const res = await supertest(server)
        .post('/v1/auth/login')
        .send({
          username: 'newuser',
          password: password
        });

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Invalid email or password');
    });

    it ('should return invalid email/password for wrong password', async () => {

      const res = await supertest(server)
        .post('/v1/auth/login')
        .send({
          username: username,
          password: 'somepassword'
        });

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Invalid email or password');
    });
  });
});