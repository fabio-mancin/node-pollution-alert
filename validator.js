const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('username').escape().trim().isLength(3).withMessage('Username must be at least 3 characters long')
  ]
}

const formValidationRules = () => {
  const validateCoordinates = c => {
    const LATITUDE_REGEXP = new RegExp(`^[+-]?(([1-8]?[0-9])(\.[0-9]{1,20})?|90(\.0{1,20})?)$`)
    const LONGITUDE_REGEXP = new RegExp(`^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,20})?)|180(\.0{1,20})?)$`)
    const splitCoordinates = c.split(", ")
    return LATITUDE_REGEXP.test(splitCoordinates[0]) && LONGITUDE_REGEXP.test(splitCoordinates[1])
  }
  return [
    body('title').escape().trim(),
    body('username').escape().trim().custom(v=>{
      if (v.length >= 3 || v.length === 0) return true
      throw new Error('Username must be at least 3 characters long')
    }).withMessage('Username must be at least 3 characters long'),
    body('coordinates').custom((v)=>{
      if (!validateCoordinates(v)) throw new Error('Invalid coordinates')
      return true
    })
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
  formValidationRules
}