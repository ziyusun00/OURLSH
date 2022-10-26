const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());



router.get('/:id', async (req, res, next) => {
    console.log("made it in the routes/tenant.js")
    let accountId = parseInt(req.params.id);
    //let accountId = req.query.id; //Don't know whether params or body will be used
     
    const tenantByID = await req.models.tenant.fetchTenantByID(accountId);
    res.json(tenantByID);
    next();
});

module.exports = router;