const knex = require('../database/knex');
const TENANT_TABLE = 'tenant';
const LANDLORD_TABLE = 'landlord';
   
   const createTenant = async (email, password, first_name, last_name) => {
      console.log("creating a tenant")
       const query = knex(TENANT_TABLE).insert({email, password, first_name, last_name});
       const results = await query;
       return results;
   }

   const createLandlord = async (email, password, first_name, last_name) => {
      console.log("creating a landlord")
       const query = knex(LANDLORD_TABLE).insert({email, password, first_name, last_name});
       const results = await query;
       return results;
   }
   
   
module.exports = {
   createTenant,
   createLandlord
}