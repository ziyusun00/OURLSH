const { Router } = require('express');
const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err);
            res.status(400).send('Problem dropping the table');
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) {
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table');
              } else {
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table');
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  //POST /register/landlord
  app.post('/register/landlord', async (req, res, next) => {
    try {
      const body = req.body;
      const result = await pool.createNewLandlord(body.firstName, body.lastname, body.email, body.password);
      console.log("Result of createNewLandlord: ", result);
      if (result.error === "Invalid email") {
        console.log("Invalid email");
        res.status(400).json({ message: "Invalid email" });
      } else if (result.error === "User already exists") {
        console.log("User already exists");
        res.status(400).json({ message: "User already exists" });
      } else if (result.error === "Incomplete input") {
        console.log("Incomplete input");
        res.status(400).json({ message: "Incomplete input" });
      } else {
        console.log("Landlord created");
        //Note: we don't need to authenticate the user here because the user is already created
        //Also, the role is not added to the table because it can change every session
        const token = await sessionController.generateAuthToken(body.email, 'landlord'); //the role is hardcoded to user
        res.status(201).json({ "accessToken": token });
      }

    } catch (err) {
      console.error('Failed to create new landlord profile:', err);
      res.status(400).json({ message: err.toString() });
    }

  })

  //POST /register/tenant
  app.post('/register/tenant', async (req, res, next) => {
    try {
      const body = req.body;
      const result = await pool.createNewTenant(body.firstName, body.lastname, body.email, body.password, body.landlord);
      console.log("Result of createNewTenant: ", result);
      if (result.error === "Invalid email") {
        console.log("Invalid email");
        res.status(400).json({ message: "Invalid email" });
      } else if (result.error === "User already exists") {
        console.log("User already exists");
        res.status(400).json({ message: "User already exists" });
      } else if (result.error === "Incomplete input") {
        console.log("Incomplete input");
        res.status(400).json({ message: "Incomplete input" });
      } else {
        console.log("Tenant created");
        //Note: we don't need to authenticate the user here because the user is already created
        //Also, the role is not added to the table because it can change every session
        const token = await sessionController.generateAuthToken(body.email, 'tenant'); //the role is hardcoded to user
        res.status(201).json({ "accessToken": token });
      }

    } catch (err) {
      console.error('Failed to create new tenant profile:', err);
      res.status(400).json({ message: err.toString() });
    }

  })
}