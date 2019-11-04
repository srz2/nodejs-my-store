NodeJS My Store
===============

This project was a learning experience by following a [YouTube Tutorial](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q) online which taught
how to create a NodeJS API.

The project created a "store" api which added products and did fundamental links to orders (although not fully fleged). It also covered the basics of authentication and databasing.

## Setting up the API

In order to use the API, the `.env_sample` must be used as a template to create the `.env` file. This includes credentials for the MongoDB database.

**This must be done first otherwise the API will fail to run correctly**

### Start the API

Simply call:

    node server.js

## How to Use the API

In order to use the API, most requests must be done with a user `token`. For some requests like retrieving products, a `token` is not required.

### Users

A user represents a registered and authorized user to use the API.

#### Create a User

To create a new user a **POST** `/user/signup` request must be made. 

The payload of the request should include, as a *JSON* body:

    - email
    - password

#### Login as a User

To login as a user, an authorization token will be given which will allow the user to perform "authorized" commands such as adding or deleting things.

To login as an authorized user, a **POST** `/user/login` request must be made.

The payload of the request should include, as a *JSON* body:

    - email
    - password

Note: The provided email/password needs to be the same of a pre-signed-up user.

#### Delete a User

To delete a user, you must have an authorization token which should be provided in the header.

To delete a user, a **DELETE** `/user/userID` request must be made. The `userID` should be the ID of the user as it is stored in the database.

### Products

A catalog of products is able to be maintained which includes the **name**, **price**, and a **picture** of the product.

#### Get All Products

To get all products in the catalog, a **GET** `/products` request must be made.

#### Get a Specific Product

To get a specific product in the catalog, a **GET** `/products/productID` request must be made. The `productID` should be the ID of the product as it is stored in the database.

#### Create a New Product

To create a new product, you must have an authorization token which should be provided in the header.

To create a new product in the catalog, a **POST** `/products` request must be made.

The payload of the request should include, as a *form-data* body:

    - name
    - price
    - productImage


#### Update a Product

To update a product, you must have an authorization token which should be provided in the header.

To update a product in the catalog, a **PATCH** `/products/productID` request must be made. The `productID` should be the ID of the product as it is stored in the database.

The payload of the request should include, as a *JSON array* body:

```javascript
[
    { 
        "propName": "{property_name}",
        "value": "new_property_value" 
    }
]
```

#### Delete a Product

To delete a product, you must have an authorization token which should be provided in the header.

To update a product in the catalog, a **DELETE** `/products/productID` request must be made. The `productID` should be the ID of the product as it is stored in the database.

### Orders

**To do anything with orders, you must have an authorization token which should be provided in the header.**

Orders are a unique database entry because it contains a reference to product(s) in the database which, using **mongoose** can enable to output to verbosely look up and links the reference ids for the API's output

#### Get All Orders

To get all orders, you must have an authorization token which should be provided in the header.

To get all products in the catalog, a **GET** `/orders` request must be made.

#### Get a Specific Order

To get a specific order, you must have an authorization token which should be provided in the header.

To get a specific order in the catalog, a **GET** `/orders/orderID` request must be made. The `orderID` should be the ID of the order as it is stored in the database.

#### Create a New Order

To create an order, you must have an authorization token which should be provided in the header.

To create a new order in the catalog, a **POST** `/order` request must be made.

The payload of the request should include, as a *form-data* body:

    - quantity
    - productID

#### Delete an Order

To delete an order, you must have an authorization token which should be provided in the header.

To delete an order in the catalog, a **DELETE** `/orders/orderID` request must be made. The `orderID` should be the ID of the product as it is stored in the database.

## Modules Used

There were a lot of modules used, here are the main ones:

    - express

        Express is used to create routes for the API and process 
        GET/POST/DELETE/etc.. requests and route them to the appropriate logic

    - mongoose

        Mongoose is a connection wrapper with MongoDB which allowed easy
        connection, save, load, search of the database for persistant data

    - morgan

        Morgan is used to a simple debugging tool which allowed color
        coded messages to be displayed in the log as requests are processed

    - multer

        Multer is used to process incoming files. For this project it
        is specifically used to project JPEG/PNG files only

    - body-parser

        This package was used to help parse incoming data submitted by the
        user which was put in the body of the request. With this, the data
        automatically gets routed to the `req.body.` of requests

    - jsonwebtoken

        This tool is used to generate and validate web tokens which was
        used to validate a user

    - bcrypt

        The package is used to encrypt hashes for passwords

    - dotenv

        This tool is used to ingest a `.env` file which aids in the separation
        of important enviornment variables used in the API

