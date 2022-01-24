module.exports = {
  validateCoordinates: c => {
    const LATITUDE_REGEXP = new RegExp(`^[+-]?(([1-8]?[0-9])(\.[0-9]{1,20})?|90(\.0{1,20})?)$`)
    const LONGITUDE_REGEXP = new RegExp(`^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,20})?)|180(\.0{1,20})?)$`)
    const splitCoordinates = c.split(", ")
    return LATITUDE_REGEXP.test(splitCoordinates[0]) && LONGITUDE_REGEXP.test(splitCoordinates[1])
  }
}