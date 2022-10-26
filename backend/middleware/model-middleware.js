const Tenant = require('../models/tenant');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      tenant: Tenant
  }
  next();
}
module.exports = {
  createModelsMiddleware
}