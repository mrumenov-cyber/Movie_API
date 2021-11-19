//Declarations of the packages I am going to use
const express = require('express'),
  morgan = require('morgan');

const app = express(); //Encapsulated the express function with variable, app.

app.get('/', (req, res) => {
  res.send('Welcome to my Movie app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

// List of my movies, this is JSON object that carries movie data
let topMovies = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Chamber of Secrets',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Prisoner of Azkaban',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Goblet of Fire',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Order of the Phoneix',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Half-Blood Prince',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Deadly Hallows - Part 1',
        author: 'J:K: Rowling'
    },
    {
        title:'Harry Potter and the Deadly Hallows - Part 2',
        author: 'J:K: Rowling'
    },
    {
        title:'Wounderful Beasts and Where to Find them',
        author: 'J:K: Rowling'
    },
    {
        title:'Wounderful Beasts and Where to Find them and Grindelwaldov\'s Evil Deeds',
        author: 'J:K: Rowling'
    },
    {
        title:'Wounderful Beasts and Where to Find them and The Secrets of Dumbledore',
        author: 'J:K: Rowling'
    },
]

// Midelware functions
app.use(morgan('common')); //log all requests on terminal
app.use(express.static('public')); //serve all static files in public folder



//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});


// Created Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//Listen for requests on the port
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
