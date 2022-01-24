const {
  User
} = require('../models');

exports.index = (req, res) => {
  res.render('sign-up');
};

exports.signUp = async (req, res) => {
  const username = req.body.username
  const addedUser = await User.findOrCreate({
    where: {
      username: username
    }
  })

  addedUser[1] ?
    res.status(201).render('home', {
      username: username,
      message: 'New user created.'
    }) :
    res.status(303).render('sign-up', {
      message: "Username already exists."
    })
};