//Declarations of the packages I am going to use
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require ('uuid'),
  mongoose = require ('mongoose'),
  Models = require('./models.js');

const app = express(); //Encapsulated the express function with variable, app.
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
app.get('/movies', (req, res) => {
    res.json(topMovies); //return JSON object containing movies
});

//Get single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => {
        return movie.title === req.params.title
    }));
});

//Get movies by genre
app.get('/movies/genre/:name', (req, res) => {
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
app.get('/movies/director/:name', (req, res) => {
    Movies.findOne({ "Director.Name" : req.params.name })
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  
  app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//Get all users
app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500). send('Error: ' + err);
    });
});

app.get('/users/:Username', (req, res) => 
    {
    Users.findOne({Username: req.params.Username})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
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
app.put('/users/:Username', (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
    app.delete('/users/:Username/movies/:MoviesID', (req, res) => {
    Users.findOneAndDelete({username: req.params.Username}, 
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
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
