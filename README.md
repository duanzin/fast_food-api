# Fast Food - Api

> back end of an app for ordering fast food made with node, typescript and postgresql

## Setting up

Clone this repo and install all dependencies using:
```
npm i
```
Create a PostgreSQL database with the name of your liking, then make an `.env` file using the `.env.example` file as basis and insert your database url, the port you want this api to run in and simply run the app, the code will create the necessary tables automatically.
If the tables arent created, use the following sql query on the database
```
CREATE TABLE meals (
      id SERIAL PRIMARY KEY,
      customer TEXT NOT NULL,
      observation TEXT,
      status BOOLEAN DEFAULT false
    );
    
CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      meal_id INTEGER NOT NULL REFERENCES meals (id)
    );
```

## Running the project

To start the code, run the following command

```
npm run dev
```

To run tests, input the following command

```
npm t
```
Be warned, running tests will delete all items on database and insert elements with unusual looking values

## Using the API

This api was made to be used in conjunction with [fast_food-front](https://github.com/duanzin/fast_food-front).
However, if you want to interact with it directly it is recommended you use an api client like postman or insomnia.
All calls are made by sending a method to the api URL:

```
http://localhost:{port}
```

Below are the api routes and their uses.

### POST Route

```
POST http://localhost:{port}/
```

Inserts an object into the meals table and one or several objects in the products table.
Does not return anything.
Expects a body like this:
```
{
  "customer":"name",
  "observation": "some observation about the order",
  "products": [
      {"name": "product name 1", "quantity": 1},
      {"name": "product name 2", "quantity": 2}
      ]
}

```
Observation is not required, but if its added it must be a string.
Products can have several objects, but requires at least one.
id and status are assigned automatically

### GET Route

Returns an array with all meal objects and all products associated with them inside.

```
GET http://localhost:{port}/
```
Return body:
```
[
      {
        "id": 1,
        "customer":"name",
        "observation": "some observation about the order",
        "status": false,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
      {
        "id": 2,
        "customer":"name",
        "observation": "some observation about the order",
        "status": true,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
]
```
Observation is returned as null if it doesnt exist.

### PATCH Route

Sets a meal status to true, then returns an array with all meal objects and all products associated with them inside.
You must put the id of the meal you want to update in the url.

```
PATCH http://localhost:{port}/{id}
```
Return body:
```
[
      {
        "id": 1,
        "customer":"name",
        "observation": "some observation about the order",
        "status": false,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
      {
        "id": 2,
        "customer":"name",
        "observation": "some observation about the order",
        "status": true,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
]
```

### DELETE Route

Deletes a meal and all its associated products, then returns an array with all meal objects and all products associated with them inside.
You must put the id of the meal you want to delete in the url.

```
DELETE http://localhost:{port}/{id}
```
Return body:
```
[
      {
        "id": 1,
        "customer":"name",
        "observation": "some observation about the order",
        "status": false,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
      {
        "id": 2,
        "customer":"name",
        "observation": "some observation about the order",
        "status": true,
        "products": [
            {"name": "product name 1", "quantity": 1},
            {"name": "product name 2", "quantity": 2}
            ]
      },
]
```
The deletion occurs before making the array, so the deleted meal will not be returned.

