const server = require('../../app');
const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../../models');

describe('TEST SIGN IN CONTROLLER - /POST /sign-in \n \n', () => {
  // cleaning up after each test
  afterEach(async function() {
    // emptying the database
    try {
      await User.destroy({truncate: true})
    } catch(error) {
      console.log(error)
    }
    console.log('Deleted all Users from database.')
  })

  it('it should sign user foo in', async () => {
    try {
      await request(server)
      .post('/sign-up')
      .send({ username: "foo"})
      .expect(201)
      await request(server)
        .post('/sign-in')
        .send({ username: "foo"})
        .expect(201)
    } catch(err) {
      console.log(err)
    }
    
  })

  it('should find no user and return 404', async () => {
    try {
      await request(server)
        .post('/sign-in')
        .send({ username: "foo"})
        .expect(404)
    } catch(err) {
      console.log(err)
    }
  })
});