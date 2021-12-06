//Declarations of the packages I am going to use
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require ('uuid'),
  mongoose = require ('mongoose'),
  Models = require('./models.js'),
  passport = require('passport');

const app = express();//Encapsulated the express function with variable, app
let auth = require('./auth')(app);
require('./passport');
// Midelware functions
app.use(morgan('common')); // log all requests on terminal
app.use(express.static('public')); // serve all static files in public folder
app.use(bodyParser.json()); //get required json data from http request body inside req handlers using req.body

const cors = require('cors');
const { check, validationResult } = require('express-validator');

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
        let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
        return callback(new Error(message ), false);
      }
      return callback(null, true);
    }
  }));


 //Encapsulated the express function with variable, app.
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect(
    'mongodb://localhost:27017/myFlixDB', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
}); //linking REST API  to mongodb database

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
        title:'Fantastic Beasts and Where to Find them',
        author: 'J:K: Rowling',
        year: 2016,
        director: 'David Yates',
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Fantastic Beasts and Where to Find them and Grindelwaldov\'s Evil Deeds',
        author: 'J:K: Rowling',
        year: 2020,
        director: 'David Yates',
        genre: ['Novel', 'Fantasy Fiction', 'Children\'s movie', 'Adventure']
    },
    {
        title:'Fantastic Beasts and Where to Find them and The Secrets of Dumbledore',
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
app.get('/documentations', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//Get movies request/route
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });  
//res.json(topMovies); //return JSON object containing movies

//Get single movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(topMovies.find((movie) => {
        return movie.title === req.params.title
    }));
});

//Get movies by genre
app.get('/movies/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Genre.Name" : req.params.name })
      .then((genre) => {
        res.json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//Gets information about a specific director
app.get('/movies/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Director.Name" : req.params.name })
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  
  //Get user by username
app.get('/users/:Username', passport.authenticate ('jwt', {session: false}), (req, res) =>{
    Users.findOne({username: req.params.Username})
      .then((Users)=> {
        res.status(201).json(Users);
      })
      .catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//Post users - Creating new user account
app.post('/users',
// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

// check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
        //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });
  
 // Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

    // Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });
    

// Delete Favourite movie from user by username
app.delete('/users/:Username/movies/:MoviesID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({username: req.params.Username}, 
      {$pull:{
        favoriteMovies: req.params.MoviesID}
      },
      { new: true }, //Returns document
      (err, removeFavorite) => {
        if (err){
          console.error(err);
          res.status(500).send('Error: ' + err);
        }else{
          res.json(removeFavorite);
        }
      });
    });

// Created Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//Listen for requests on the port
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
