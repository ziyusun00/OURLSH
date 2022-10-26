const Tenant = require('../models/tenant');
const Register = require('../models/register');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      tenant: Tenant,
      register: Register
  }
  next();
}
module.exports = {
  createModelsMiddleware
}