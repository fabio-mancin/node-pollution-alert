const { Alert } = require('../models');

exports.addAlert = async (req, res) => {
  const username = req.body.username !== "" ? req.body.username : "anonymous"
  const rowNumber = await Alert.count()
  const title = req.body.title !== "" ? req.body.title : parseInt(rowNumber) + 1

  const addedAlert = await Alert.findOrCreate({
    where: {
      coordinates: req.body.coordinates
    },
    defaults: {
      username: username,
      path: req.file.path,
      title: title
    }
  })

  addedAlert[1] ? 
    res.status(201).render('home', {
      formMessage: `Added alert ${title}`
    }) :
    res.status(303).render('home', {
      formMessage: 'Coordinates already taken.'
    })
};