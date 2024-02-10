import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booklist",
  password: "yourpass",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var orderbooks='rate';

app.get("/", async (req, res) => {
  
  if (orderbooks=='rate'){
    var bookspg= await db.query("SELECT * FROM books ORDER BY rating DESC");
  } else{
    var bookspg= await db.query("SELECT * FROM books ORDER BY watch DESC");
  }
  
  bookspg=bookspg.rows
  const booksData={bookspg:bookspg};
  
  
  
  res.render("index.ejs", booksData);
});

app.post("/", async (req, res) => {
  
  orderbooks=req.body.escolhaordem;
  if (orderbooks=='rate'){
    var bookspg= await db.query("SELECT * FROM books ORDER BY rating DESC");
  } else{
    var bookspg= await db.query("SELECT * FROM books ORDER BY watch DESC");
  }
  
  bookspg=bookspg.rows
  const booksData={bookspg:bookspg};
  
  
  
  res.render("index.ejs", booksData);
});


app.get("/new-book", async (req, res) => {
  
  res.render("newbook.ejs");
});

app.post("/get-books", async (req, res) => {

let url=[req.body.namenew];
url = url[0].split(" ").join('+');
url= `https://openlibrary.org/search.json?q=${url}`

  try{
    const result = await axios.get(url);
    const dados=result.data.docs;
    var dadosselect=[];
    var dadoscover=[];
    
    if (dados!=""){
      
    for (var i=0;i<6;i++){
      
      dadosselect.push(dados[i])
      
    }
    for (var i=0;i<dadosselect.length;i++){
      var idimage=dadosselect[i].cover_i;
      // var buscaimage= await axios.get(`https://covers.openlibrary.org/b/id/${idimage}-L.jpg`);
      dadoscover.push(`https://covers.openlibrary.org/b/id/${idimage}-L.jpg`);
      
    }

    
    
    
    res.render("newbook.ejs", { dadosselect:dadosselect,dadoscover:dadoscover });
    }else{
      dadosselect=[{title:"Not Found, try again..."}];
      console.log(dadosselect)
      res.render("newbook.ejs", { dadosselect:dadosselect,dadoscover:dadoscover });
    }
    
}catch (error) {

res.status(500);
}

});

app.post("/bookadd", async (req, res) => {
 console.log(req.body)
 try{
  await db.query("INSERT INTO books (name, rating, review, watch, cover_link) VALUES ($1, $2, $3, $4, $5)",[req.body.nameselect,req.body.avaliacao ,req.body.review_input, req.body.dataAvaliacao, req.body.imgselect]);

 }catch(err){
  console.error(err);
 }
res.redirect("/");
});

app.post("/get-name", async (req, res) => {
  var bookspg= await db.query("SELECT * FROM books WHERE LOWER(name) LIKE '%' || LOWER($1) || '%'",[req.body.name]);

  

bookspg=bookspg.rows;
const booksData={bookspg:bookspg};



res.render("index.ejs", booksData);
 });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


