const { Alert } = require('../models');

module.exports = {
  queryAlerts: async (req, res) => {
    const alerts = await Alert.findAll()
    res.json(alerts)
  }
}