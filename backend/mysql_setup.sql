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
        'occupied' BOOLEAN NOT NULL,
        PRIMARY KEY ('id'),
        FOREIGN KEY ('landlord_id') REFERENCES landlord(id)

        
    );

    CREATE TABLE 'ourlsh'.'tenant'(
        'id' SERIAL NOT NULL,
        'password' VARCHAR(255) NOT NULL,
        'email' VARCHAR(255) NOT NULL,
        'first_name' VARCHAR(255) NOT NULL,
        'last_name' VARCHAR(255) NOT NULL,
        'prop_id' INT NOT NULL,
        'landlord_id' INT NOT NULL,
        PRIMARY KEY ('id'),
        FOREIGN KEY ('landlord_id') REFERENCES landlord(id),
        FOREIGN KEY ('prop_id') REFERENCES 'ourlsh'.'prop'(id)

    );

    CREATE TABLE 'ourlsh'.'work_order'(
        'wo_num' SERIAL NOT NULL,
        'prop_id' INT NOT NULL,
        'status' INT NOT NULL,
        'date' VARCHAR(255) NOT NULL,
        'resolved' BOOLEAN NOT NULL,
        'importance' INT NOT NULL,
        'tenant_id' INT NOT NULL,
        'description' VARCHAR(255) NOT NULL,
        'invoice_id' INT NOT NULL,
        'land_id' INT NOT NULL,
        PRIMARY KEY ('wo_num'),
        FOREIGN KEY ('prop_id') REFERENCES 'ourlsh'.'prop'(id),
        FOREIGN KEY ('tenant_id') REFERENCES 'ourlsh'.'tenant'(id),
        FOREIGN KEY ('invoice_id') REFERENCES 'ourlsh'.'invoice'(id),
        FOREIGN KEY ('land_id') REFERENCES 'ourlsh'.'landlord'(id)

    )

    CREATE TABLE 'ourlsh'.'invoice'(
        'id' SERIAL NOT NULL,
        'amount' FLOAT NOT NULL,
        'date' VARCHAR(255) NOT NULL,
        'payment_type' VARCHAR(255) NOT NULL,
        'for' INT NOT NULL,
        'land_id' INT NOT NULL,
        'prop_id' INT NOT NULL,
        'tenant_id' INT NOT NULL,
        FOREIGN KEY ('prop_id') REFERENCES 'ourlsh'.'prop'(id),
        FOREIGN KEY ('tenant_id') REFERENCES 'ourlsh'.'tenant'(id),
        FOREIGN KEY ('land_id') REFERENCES 'ourlsh'.'landlord'(id)
    )

   

    

