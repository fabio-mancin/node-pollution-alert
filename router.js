const express = require('express');
const router = express();
const multer  = require('multer')
const { userValidationRules, formValidationRules, validate } = require('./validator.js')

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/images')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[1]}`)
  }
})
 
const upload = multer({ storage: storage, fileFilter: imageFilter });

const homeController = require('./controllers/home')
const signInController = require('./controllers/signIn')
const signUpController = require('./controllers/signUp')
const logOutController = require('./controllers/logOut')
const addAlertController = require('./controllers/addAlert')
const queryAlertsController = require('./controllers/queryAlerts')
const backController = require('./controllers/back')

/**
 * Primary app routes.
 */
router.get('/', homeController.index)
router.get('/log-out', logOutController.logOut)
router.get('/sign-up', signUpController.index)
router.get('/back', backController.back)

/**
 * API routes.
 */
router.post('/sign-in', userValidationRules(), validate, signInController.signUserIn)
router.post('/sign-up', userValidationRules(), validate, signUpController.signUp)
router.post('/add-alert', upload.single('image'), formValidationRules(), validate, addAlertController.addAlert)
router.get('/query-alerts', queryAlertsController.queryAlerts)

module.exports = router