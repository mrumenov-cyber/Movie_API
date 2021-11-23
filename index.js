//Declarations of the packages I am going to use
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require ('uuid');

const app = express(); //Encapsulated the express function with variable, app.

//Index page request/route
app.get('/', (req, res) => {
  res.send('Welcome to my Movie app!');
});

// Secret url path
app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

// List of my movies, this is JSON object that carries movie data
let topMovies = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J:K: Rowling',
        year: 2001,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Chamber of Secrets',
        author: 'J:K: Rowling',
        year: 2002,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Prisoner of Azkaban',
        author: 'J:K: Rowling',
        year: 2004,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Adventure']
    },
    {
        title:'Harry Potter and the Goblet of Fire',
        author: 'J:K: Rowling',
        year: 2005,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Order of the Phoneix',
        author: 'J:K: Rowling',
        year: 2007,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Half-Blood Prince',
        author: 'J:K: Rowling',
        year: 2009,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Deadly Hallows - Part 1',
        author: 'J:K: Rowling',
        year: 2010,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Harry Potter and the Deadly Hallows - Part 2',
        author: 'J:K: Rowling',
        year: 2011,
        director: ['David Yates', 'Alfonso Cuarón', 'Mike Newell', 'Chris Columbus'],
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Wounderful Beasts and Where to Find them',
        author: 'J:K: Rowling',
        year: 2016,
        director: 'David Yates',
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Wounderful Beasts and Where to Find them and Grindelwaldov\'s Evil Deeds',
        author: 'J:K: Rowling',
        year: 2020,
        director: 'David Yates',
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Wounderful Beasts and Where to Find them and The Secrets of Dumbledore',
        author: 'J:K: Rowling',
        year: 2022,
        director: 'David Yates',
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
]

// Midelware functions
app.use(morgan('common')); // log all requests on terminal
app.use(express.static('public')); // serve all static files in public folder
app.use(bodyParser.json()); //get required json data from http request body inside req handlers using req.body


//GET requests

//Get documentation request/route
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//Get movies request/route
app.get('/movies', (req, res) => {
    res.json(topMovies); //return JSON object containing movies
});

//Get single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(myMovies.find((movie) => {
        return movie.titile === req.params.title
    }));
});

//Get movies by genre
app.get('/movies/genre/:title', (req, res) => {
    res.send('GET request returning data about a movie genre.');
});

//Get movie director name
app.get('movies/director/:name', (req, res) =>{
    res.send('GET request that returs the name of movie director.')
})

// Created Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//Listen for requests on the port
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
