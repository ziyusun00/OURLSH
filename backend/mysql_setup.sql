CREATE DATABASE IF NOT EXISTS ourlsh;

USE ourlsh;

    CREATE TABLE 'ourlsh'.'landlord'(
        'id' SERIAL NOT NULL,
        'password' VARCHAR(255) NOT NULL,
        'email' VARCHAR(255) NOT NULL,
        'first_name' VARCHAR(255) NOT NULL,
        'last_name' VARCHAR(255) NOT NULL,
         PRIMARY KEY ('id')
    );

     CREATE TABLE 'ourlsh'.'prop'(
        'id' SERIAL NOT NULL,
        'date_available' DATE NOT NULL,
        'status' INT  NOT NULL,
        'landlord_id' INT  NOT NULL,
        'prop_name' VARCHAR(255) NOT NULL,
        'address' VARCHAR(255) NOT NULL,
        'description' VARCHAR (255) NOT NULL,
        'occupied' BOOLEAN 
        PRIMARY KEY ('id'),
        FOREIGN KEY ('landlord_id') REFERENCES landlord(id)

        
    );

    CREATE TABLE 'ourlsh'.'tenant'(
        'id' SERIAL NOT NULL,
        'password' VARCHAR(255) NOT NULL,
        'email' VARCHAR(255) NOT NULL,
        'first_name' VARCHAR(255) NOT NULL,
        'last_name' VARCHAR(255) NOT NULL,
        'prop_id' INT,
        'landlord_id' INT,
        PRIMARY KEY ('id'),
        FOREIGN KEY ('landlord_id') REFERENCES landlord(id),
        FOREIGN KEY ('prop_id') REFERENCES 'ourlsh'.'prop'(id)

    );

   

    

