const Tenant = require('../models/tenant');
const Register = require('../models/register');
const Landlord = require('../models/landlord');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      tenant: Tenant,
      register: Register,
      landlord: Landlord
  }
  next();
}
module.exports = {
  createModelsMiddleware
}