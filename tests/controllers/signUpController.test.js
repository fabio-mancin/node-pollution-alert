const server = require('../../app');
const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../../models');
const fs = require('fs-extra')

describe('TEST SIGN UP CONTROLLER - /POST /sign-up \n \n', () => {
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

  it('it should POST two new users', async function () {
    try {
      await request(server)
        .post('/sign-up')
        .send({username: "foo" })
        .expect(201);
      await request(server)
        .post('/sign-up')
        .send({username: "bar"})
        .expect(201)
    } catch (err) {
      console.log(err)
    }
  })

  it(`it should add a user but not the other one since it's a duplicate`, async function () {
    try {
      await request(server)
        .post('/sign-up')
        .send({username: "foo"})
        .expect(201)
      
      await request(server)
        .post('/sign-up')
        .send({username: "foo"})
        .expect(303)
    } catch (err) {
      console.log(err)
    } 
  })
});