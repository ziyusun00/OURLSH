const knex = require('../database/knex');
const TENANT_TABLE = 'tenant';
   
   const fetchTenantByID = async (id) => {
      console.log("made it inside the models/tenant.js")
      //uses passed in id to get the associated tenant but only the specified columns
       const query = knex(TENANT_TABLE).where({ id })
       .select("id",
       "email",
       "first_name",
       "last_name",
       "prop_id",
       "landlord_id");

       const results = await query;
       return results;
   }
   
module.exports = {
   fetchTenantByID
}