const server = require('../../app');
const {
  expect
} = require('chai');
const request = require('supertest');
const {
  Alert
} = require('../../models');
const fs = require('fs-extra')

describe('TEST QUERY ALERTS CONTROLLER - /GET /query-alerts \n\n', () => {
  const dir = './dist/images'
  // cleaning up after each test
  afterEach(async function () {
    // emptying the database
    try {
      await Alert.destroy({
        truncate: true
      })
    } catch (error) {
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

  it('it should GET an empty array', async () => {
    const res = await request(server).get('/query-alerts').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(0);
  });

  it('it should GET an array with 1 element', async () => {
    console.log('Adding a fake alert')
    await request(server)
      .post('/add-alert')
      .set('Content-Type', 'multipart/form-data')
      .field('username', 'foo')
      .field('coordinates', '44.972570682240644, -106.171875')
      .field('title', 'baz')
      .attach('image', fs.readFileSync('./tests/static/test.png'), 'test.png')

    console.log('..and retrieving it')
    const res = await request(server).get('/query-alerts').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(1);
    expect(res.body[0]).to.have.property('username', 'foo');
    expect(res.body[0]).to.have.property('title', 'baz');
    expect(res.body[0]).to.have.property('coordinates', '44.972570682240644, -106.171875');
    expect(res.body[0]).to.have.property('path');
  });

});