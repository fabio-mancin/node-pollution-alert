const server = require('../../app');
const { expect } = require('chai');
const request = require('supertest');
const { Alert } = require('../../models');
const fs = require('fs-extra')

describe('TEST ADD ALERT CONTROLLER - /POST add-alert \n \n', () => {

  // cleaning up after each test
  afterEach(async function() {
    // path to clear
    const dir = './dist/images'
    // emptying the database
    try {
      await Alert.destroy({truncate: true})
    } catch(error) {
      console.log(error)
    }
    console.log('Deleted all Alerts from database.')
    
    // emptying the image folder
    try {
      fs.emptyDir(dir)
      console.log('All files deleted succesfully. \n')
    } catch(error) {
      console.log(error)
    }
    
  })

  // in order to work with text and files I can't use .send()
  // the workaround is to use .field() and .attach() to simulate the request
  it('it should POST an alert', async () => {
    await request(server)
      .post('/add-alert')
      .set('Content-Type', 'multipart/form-data')
      .field('username', 'foo')
      .field('coordinates', '44.972570682240644, -106.171875')
      .field('title', 'baz')
      .attach('image', fs.readFileSync('./tests/static/test.png'), 'test.png')
      .expect(201)
  });

  it('it should not POST an alert because of bad data', async () => {
    await request(server)
      .post('/add-alert')
      .set('Content-Type', 'multipart/form-data')
      .field('username', 'foo')
      .field('coordinates', 'bar')
      .field('title', 'baz')
      .attach('image', fs.readFileSync('./tests/static/test.png'), 'test.png')
      .expect(422)
  });

  it('it should not POST since coordinates already exist', async () => {
    await request(server)
      .post('/add-alert')
      .set('Content-Type', 'multipart/form-data')
      .field('username', 'foo')
      .field('coordinates', '44.972570682240644, -106.171875')
      .field('title', 'baz')
      .attach('image', fs.readFileSync('./tests/static/test.png'), 'test.png')
      .expect(201)

    await request(server)
      .post('/add-alert')
      .set('Content-Type', 'multipart/form-data')
      .field('username', 'foo')
      .field('coordinates', '44.972570682240644, -106.171875')
      .field('title', 'baz')
      .attach('image', fs.readFileSync('./tests/static/test.png'), 'test.png')
      .expect(303)
  });
});