process.env.NODE_ENV = 'test';

import supertest from 'supertest';
import { expect } from 'chai';
import { server } from '../../server';

import UserAccessor from '../../lib/accessor/user.accessor';

describe ('Convertor APIs', () => {

  describe ('Convert currency rates', async () => {
    let username = 'testuser';
    let password = 'password123';
    let authToken: any;

    before(async () => {
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
    });

    after(async () => {
      await UserAccessor.deleteUserByName(username);
    });
    
    it ('should convert currency rates', async () => {

      const res = await supertest(server)
        .post('/v1/convert/currency')
        .set('x-auth-token', authToken)
        .send({
          base_currency: "SEK",
          'currency_list': [
            "INR",
            "GBP",
            "JPY",
            "USD",
            "RUB"
          ],
          'amount': 20
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.be.not.empty;
    });
  });
});