# Fast Food - Api

> back end of an app for ordering fast food made with node, typescript and sqlite

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
