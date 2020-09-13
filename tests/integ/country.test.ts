process.env.NODE_ENV = 'test';

import supertest from 'supertest';
import { expect } from 'chai';
import { server } from '../../server';

import UserAccessor from '../../lib/accessor/user.accessor';

describe('Country APIs', () => {

  describe('Retrive country information', async () => {
    let username = 'testuser';
    let password = 'password123';
    let authToken: any;

    after(async () => {
      await UserAccessor.deleteUserByName(username);
    });

    it('should add user', async () => {
      const res = await supertest(server)
        .post('/v1/users/add')
        .send({
          username: username,
          password: password
        });

      expect(res.status).to.equal(200);
      expect(res.body.username, 'testuser');
    });

    it('should return authtoken on user login', async () => {

      const res = await supertest(server)
        .post('/v1/auth/login')
        .send({
          username: username,
          password: password
        });

      expect(res.status).to.equal(200);
      expect(res.body.authToken).to.not.empty;
      expect(res.body.user_id).to.not.empty;

      authToken = res.body.authToken;
    });

    it('should return countries', async () => {

      const res = await supertest(server)
        .get('/v1/country/get/indi')
        .set('x-auth-token', authToken);

      expect(res.status).to.equal(200);
      expect(res.body).to.not.empty;
      expect(res.body.length).to.equal(2);
    });

    it('should return empty for invalid search key', async () => {
      const res = await supertest(server)
        .get('/v1/country/get/indis')
        .set('x-auth-token', authToken);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.empty;
    });
  });
});