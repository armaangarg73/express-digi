import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let movieData = [] ;
let nextId = 1 ;

// Whenever you take any data chances are high for using post

// add a new movie
app.post('/movies' , (req , res) => {
   const {name , type} =  req.body;
   const newMovie = {id : nextId++ , name , type}
   movieData.push(newMovie);
   res.status(201).send(newMovie);
})

// get all movies
app.get('/movies' , (req , res) => {
    res.status(200).send(movieData);
})

// whenever we use url we use params

// get a movie with id
app.get('/movies/:id' , (req , res) => {
  const movie =  movieData.find(m => m.id === parseInt(req.params.id))

  if(!movie){
    return res.status(404).send("Movie not found");
  }
  res.status(200).send(movie);
})

// update movie
app.put('/movies/:id' , (req , res) => {
    const movie = movieData.find((m) => m.id === parseInt(req.params.id));

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    const {name , type} = req.body ;
    movie.name = name ;
    movie.type = type ;
    res.send(200).send(movie);
})

// delete movie
app.delete('/movies/:id' , (req , res) => {
   const index = movieData.findIndex(m => m.id === parseInt(req.params.id));

   if(index === -1) {
    return res.status(404).send('Movie not found');
   }
   movieData.splice(index , 1);
    return res.status(204).send("Deleted");
})

// app.get("/" , (req , res) => {
//     res.send("Hello from Armaan and his movies!");
// });

// app.get("/spiderman" , (req , res) => {
//     res.send("Which spiderman movie is in your watchlist?")
// })

// app.get("/X", (req, res) => {
//   res.send("armaangarg73");
// });

app.listen(port , () => {
    console.log(`Server is running at port : ${port}...`);
})
