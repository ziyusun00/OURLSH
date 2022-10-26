const knex = require('../database/knex');
const TENANT_TABLE = 'tenant';
   
   const registerTenant = async (crap, ton, of, stuff) => {
      console.log("made it inside the models/tenant.js")
       const query = knex(TENANT_TABLE).insert({ crap, ton, of, stuff });
       const results = await query;
       return results;
   }
   
module.exports = {
   fetchTenantByID
}