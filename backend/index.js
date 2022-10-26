require('dotenv').config();
const express = require('express');
const tenantRoutes = require('./routes/tenant' );
const {createModelsMiddleware} = require('./middleware/model-middleware' );
const cors = require('cors');
const app = express();
const port = 8000;
app.use(createModelsMiddleware);

//get rid of CORS issue
app.use(cors({
    origin: '*'
  }));
app.get('/health', (request, response, next) => {
   const responseBody = { status: 'up', port };
   response.json(responseBody);
   // next() is how we tell express to continue through the middleware chain
   next();
});
app.use('/tenants', tenantRoutes);

app.listen(port, () => {
   console.log(`This app is listening on port  ${port}`);
});