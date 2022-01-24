const { User } = require('../models');

exports.signUserIn = async (req, res) => {

  const userIsNull = await (User.findOne({
    where: { username: req.body.username }
  })) === null;

  userIsNull ? 
    res.status(404).render('home', { message: 'User not found. '}) : 
    res.status(201).render('home', { username: req.body.username })
};