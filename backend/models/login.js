//const jwt = require('jsonwebtoken' );
const Landlord = require('../models/landlord' );
const Tenant = require('../models/tenant' );
//const accessTokenSecret  = 'mysupercoolsecret' ;

const authenticateTenant = async (email, password) => {
   const tenants = await loginFetchTenantByEmail(email);
   console.log('Results of users query', tenants);
   if (tenants.length === 0) {
       console.error(`No tenants matched the email: ${email}`);
       return null;
   }
   const tenant = tenants[0];
   const validPassword = await bcrypt.compare(password, tenant.password);
   if (validPassword) {
       delete tenant.password;
       return tenant;
   }
   return null;
}
const authenticateLandlord = async (email, password) => {
   const landlords = await loginFetchLandlordByEmail(email);
   console.log('Results of users query', landlords);
   if (landlords.length === 0) {
       console.error(`No landlords matched the email: ${email}`);
       return null;
   }
   const landlord = landlords[0];
   const validPassword = await bcrypt.compare(password, landlord.password);
   if (validPassword) {
       delete landlord.password;
       return landlord;
   }
   return null;
}

module.exports = {
   authenticateTenant,
   authenticateLandlord
};