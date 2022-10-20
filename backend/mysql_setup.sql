CREATE DATABASE IF NOT EXISTS ourlsh;
    
USE ourlsh;

    CREATE TABLE 'ourlsh'.'landlord'(
        'id' SERIAL,
        'password' VARCHAR(255) NOT NULL,
        'email' VARCHAR(255) NOT NULL,
        'first_name' VARCHAR(255) NOT NULL, 
        'last_name' VARCHAR(255) NOT NULL,
         PRIMARY KEY ('id')
    );

    CREATE TABLE 'ourlsh'.'tenant'(
        'id' SERIAL,
        'password' VARCHAR(255) NOT NULL,
        'email' VARCHAR(255) NOT NULL,
        'first_name' VARCHAR(255) NOT NULL, 
        'last_name' VARCHAR(255) NOT NULL,
        'prop_id' INT, 
        'landlord_id' INT,
        PRIMARY KEY ('id'),
        FOREIGN KEY ('landlord_id') REFERENCES landlord(id),
        
        CREATE TABLE 'oprop
    );