# Book Notes
## Access the page:
This project was developed with PostgreSQL, you must set up your database as follows:
* Create a database called: booklist
* Create a table with the code:
  
 `CREATE TABLE books(
	id SERIAL PRIMARY KEY,
	name TEXT,
	rating INT,
	review TEXT,
	watch DATE,
	cover_link TEXT
);`

* In index.js remember to change the password in pg.Client. Enter your pgAdmin password.

To run it, you need to have Node.js installed.
If you already have Node, run:

`git clone https://github.com/GDeusvid/cards-137-RickandMorty.git`

`npm i`

`node index.js`

The page can be viewed at: http://localhost:3000

## What can you do:
- Add a new read book
- When adding, you can make a review, give a note and add a date
- Home page displays all books read
- You can organize the home page by note or date
- You can search by name for a read book

  ![add2](https://github.com/GDeusvid/book-notes/assets/132523391/fc06b4a8-c68e-4a5c-b8ba-c5060dbdaaba)

  ![add3](https://github.com/GDeusvid/book-notes/assets/132523391/bf49a2b0-3a6d-422d-9ef0-e813e11a7538)

  ![inicio1](https://github.com/GDeusvid/book-notes/assets/132523391/cd43dd2e-8aac-4cdc-a283-55f15b40dcb6)

  ![inicio2](https://github.com/GDeusvid/book-notes/assets/132523391/ae880fa1-402c-4c32-896a-a041be2789ed)



  


