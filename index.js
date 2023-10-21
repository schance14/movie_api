const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect('mongodb://127.0.0.1:27017/cfDB', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('process.env.CONNECTION_URI', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
    app = express(),
   bodyParser = require('body-parser'),
    uuid = require('uuid');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));

    const cors = require('cors');
    app.use(cors());

    let auth = require('./auth')(app);

    const passport = require('passport');
    require('./passport');

    const { check, validationResult} = require('express-validator');


let users = [
    {
        id: 1,
        Name: "Lenny",
        Email: "lenny2020@aol.com",
        Password: "kittycat",
        Birthday: new Date("2000-03-18"),
        favoriteMovies: ["Mean Girls"]
       
    },
    {
        id: 2,
        name: "Patrick",
        Email: "starfish@yahoo.com",
        Password: "Spongebob",
        Birthday: new Date("1990-08-06"),
        favoriteMovies: ["Lord of the Rings"]
    },
    {
        id: 3,
        name: "Wolfe",
        Email: "wolfeee@gmail.com",
        Password: "TriuneBand",
        Birthday: new Date("1995-02-18"),
        favoriteMovies: ["Lord of the Rings"]
    }
]


let movies = [
    {
        Title: "Twilight",
        Description: "The series explores the unorthodox romance between human Bella and vampire Edward, as well as the love triangle between Bella, Edward, and Jacob, a werewolf.",
        Genre: {
            Name:"Drama",
            Description:"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
        },
        Director: {
            Name:"Catherine Hardwicke",
            Description:"Catherine grew up in the Texas border town of McAllen. She studied art in Mexico, then received a degree in architecture from the University of Texas at Austin. She began her career by designing a solar townhouse complex, but soon decided that film was her true calling.",
            Birth:"October 21, 1955"
        },
        
        "imageUrl":""
    },
    {
        Title: "Lord of the Rings",
        Description: " A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron. This movie is adapted from the novel of the same name and shows a different world where different types of creatures live.",
        Genre: {
            Name:"Fantasy",
            Description:"Fantasy fiction is a genre of fiction that involves elements that cannot exist within the real world. This fictional universe includes things like magic, mythology, or life from other worlds or universes."
        },
        Director: {
            Name:"Peter Jackson",
            Description:"Peter Jackson is a New Zealand film director, producer, actor, and screenwriter, known for his Lord of the Rings film trilogy, adapted from the novel by J. R. R. Tolkien. He is also known for his 2005 remake of King Kong and as the producer of District 9.",
            Birth:"October 31, 1961"
        },
        
        "imageUrl":""
    },
    {
        Title: "Harry Potter and the Prisoner of Azkaban",
        Description: "Harry Potter & The Prisoner of Azkaban is about Harry's 3rd year at Hogwarts. Along with friends Ron and Hermione, Harry investigates the case of Sirius Black, an escaped prisoner from Azkaban, the wizard prison.",
        Genre: {
            Name:"Fantasy",
            Description:"Fantasy fiction is a genre of fiction that involves elements that cannot exist within the real world. This fictional universe includes things like magic, mythology, or life from other worlds or universes."
        },
        Director: {
            Name:"Alfonso Cuarón",
            Description:"Alfonso Cuarón Orozco is an Academy Award-nominated Mexican film director, screenwriter and film producer, best known for, Children of Men, Harry Potter and the Prisoner of Azkaban, Y tu mamá también, and A Little Princess. Cuarón was born in México City.",
            Birth:"November 28th, 1961"
        },
        
        "imageUrl":""
    },
    {
        Title: "Team America: World Police",
        Description: "Popular Broadway actor Gary Johnston is recruited by the elite counter-terrorism organization Team America: World Police. As the world begins to crumble around him, he must battle with terrorists, celebrities and falling in love.",
        Genre: {
            Name:"Comedy",
            Description:"Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment."
        },
        Director: {
            Name:"Trey Parker",
            Description:" American screenwriter, actor, and producer, best known as the cocreator, with Matt Stone, of the subversive animated comedy series South Park.",
            Birth:"October 19, 1969"
        },
        
        "imageUrl":""
    },
    {
        Title: "Tropic Thunder",
        Description: "Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.",
        Genre: {
            Name:"Comedy",
            Description:"Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment." 
        },
        Director: {
            Name:"Ben Stiller",
            Description:"Benjamin Edward Meara Stiller is an American actor, comedian, and filmmaker. He is the son of the comedians and actors Jerry Stiller and Anne Meara.",
            Birth:"November 30, 1965"
        },
        
        "imageUrl":""
    },
    {
        Title: "The Great Gatsby",
        Description: "The film follows the life and times of millionaire Jay Gatsby and his neighbor Nick Carraway, who recounts his encounter with Gatsby at the height of the Roaring Twenties on Long Island in New York.",
        Genre: {
            Name:"Drama",
            Description:"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
        },
        Director: {
            Name:"Baz Luhrmann",
            Description:"Baz Luhrmann is an Australian writer, director and producer with projects spanning film, television, opera, theater, music and recording industries.",
            Birth:"September 17th, 1962"
        },
        
        "imageUrl":""
    },
    {
        Title: "Inglorious Basterds",
        Description: "The film tells an alternate history story of two plots to assassinate Nazi Germany's leadership—one planned by Shosanna Dreyfus, a young French Jewish cinema proprietor, and the other planned by the British but ultimately conducted solely by a team of Jewish American soldiers led by First Lieutenant Aldo Raine.",
        Genre: {
            Name:"Drama",
            Description:"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
        },
        Director: {
            Name:"Quentin Tarantino",
            Description:"Quentin Jerome Tarantino is an American film director, screenwriter, producer, actor, and author. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
            Birth:"March 27, 1963"
        },
        
        "imageUrl":""
    },
    {
        Title: "Mean Girls",
        Description: "The plot centers on naïve teenage girl Cady Heron navigating her way through the social hierarchy of a modern American high school after years of her parents homeschooling her while conducting research in Africa.",
        Genre: {
            Name:"Comedy",
            Description:"Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment." 
        },
        Director: {
            Name:"Mark Waters",
            Description:"Mark Stephen Waters is an American film director and producer. Waters is perhaps best known for directing Just Like Heaven, Freaky Friday, and Mean Girls, and producing 500 Days of Summer.",
            Birth:"June 30th, 1964"
        },
        
        "imageUrl":""
    },
    {
        Title: "Scream",
        Description: "A year after the murder of her mother, a teenage girl is terrorized by a masked killer who targets her and her friends by using scary movies as part of a deadly game.",
        Genre: {
            Name:"Slasher",
            Description:"A slasher movie is a horror sub-genre that involves the murdering of a number of people by a psychopathic killer, typically via a knife or bladed tool (such as a scythe). In general, the horror genre is known for its fear, violence and terror."
        },
        Director: {
            Name:"Wes Craven",
             Description:"Wesley Earl Craven was an American film director, screenwriter, producer, actor, and editor. Craven has commonly been recognized as one of the greatest masters of the horror genre due to the cultural impact and influence of his work.",
             Birth:" August 2, 1939",
            Death:"August 30, 2015"
        },
        
        "imageUrl":""
    },
    {
        Title: "Zoolander",
        Description: "Derek Zoolander, a dimwitted male model, feels threatened by the new and popular Hansel; after his friends and fellow models are killed in a freak gasoline fight, he announces his retirement from modeling. However, he is persuaded by Mugatu and his lackey, Katinka Inga Shanana, to lead their Derelicte fashion show.",
        Genre: {
            Name: "Comedy",
            Description:"Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment." 
        },
        Director: {
            Name:"Ben Stiller",
            Description:"Benjamin Edward Meara Stiller is an American actor, comedian, and filmmaker. He is the son of the comedians and actors Jerry Stiller and Anne Meara.",
            Birth:"November 30, 1965"
        },

        "imageUrl":""

    }
]; 

//CREATE - POST

//to add user
app.post('/users',
    [
        check('Name', 'Name is required').isLength({min: 10}),
        check('Name', 'Name contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is  required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ], async (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

    let hashedPassword = Users.hashedPassword(req.body.Password);
    await Users.findOne({Email: req.body.Email})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Email + ' already exists');
        } else {
            Users
            .create ({
                Name: req.body.Name,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: '+ error);
            })
        }
    })
    .catch((error)=> {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//to add a movie to a users favorites list
app.post('/users/:userName/movies/:MovieTitle', passport.authenticate('jwt', {session: false}), async (req, res)=> {
    await Users.findOneAndUpdate({Name: req.params.userName}, {
        $push: { favoriteMovies: req.params.MovieTitle }
    },
    {new: true})
    .then ((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err)=> { 
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
    });

//READ - GET
//default text response when at /
app.get('/', (req, res) => {
    res.send('Welcome to Film Finder!');
});

//get a list of all movies on server
app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find()
    .then((movies)=> {
        res.status(201).json(movies);
    })
    .catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//get a specfic movie by title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), async (req, res) => {
    Movies.findOne({ Title: req.params.title})
    .then ((movies) =>{
        res.status(200).json(movies);
    })
    .catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//get data about a genre by specific genre
app.get('/movies/genres/:genreName', passport.authenticate('jwt', {session: false}), async (req, res)=> {
    Movies.find({'Genre.Name': req.params.genreName})
    .then ((movies)=> {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//get data on director by specific name
app.get('/movies/directors/:directorsName', passport.authenticate('jwt', {session: false}), async (req, res)=> {
    Movies.find({'Director.Name': req.params.directorsName})
    .then ((movies)=> {
        res.status(200).json(movies);
    })
    .catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' +err);
    });
});


//UPDATE - PUT

// update user info
app.put('/users/:userName',passport.authenticate('jwt', {session: false}), async (req, res)=> {
    Users.findOneAndUpdate(
        { Name: req.params.userName }, 
        { 
            $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    },
    }, 
    { new: true}
    )
    .then((user)=> {
        if (!user) {
            return res.status(404).send('Error: User does not exsist');
        } else {
            res.json(user);
        }
    })
    .catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//DELETE - DELETE

//Removing a movie from the user's favorite list 
app.delete('/users/:userName/movies/:MovieTitle', passport.authenticate('jwt', {session: false}), async (req, res)=> {
    await Users.findOneAndUpdate({Name: req.params.userName}, {
        $pull: { favoriteMovies: req.params.MovieTitle }
    },
    {new: true})
    .then ((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err)=> { 
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
    });

  //De-register a user
app.delete('/users/:userName', passport.authenticate('jwt', {session: false}), async (req, res)=> {
        await Users.findOneAndRemove({ Name: req.params.userName})
        .then((user)=> {
            if (!user) {
                res.status(400).send(req.params.userName + ' was not found');
            } else {
                res.status(200).send(req.params.userName + ' was deleted.');
            }
        })
        .catch((err)=> {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });




const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});









/* not needed but for reference

//CREATE
app.post('/users', (req, res)=> {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push.apply(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('user needs names')
    }
})

//UPDATE
app.put('/users/:id', (req, res)=> {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user){
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res)=> {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }
})

//DELETE
app.delete('/users/:id/:movieTitle', (req, res)=> {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }
})


//DELETE
app.delete('/users/:id', (req, res)=> {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user){
        users = users.filter( user => user.id != id);
        res.status(200).send(`User ${id} has been deleted`);;
    } else {
        res.status(400).send('no such user found')
    }
})


//READ
app.get('/movies', (req,res)=> {
    res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req,res)=> {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('not available')
    }

})

//READ
app.get('/movies/genre/:genreName', (req,res)=> {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('not available')
    }
    
})


//READ
app.get('/movies/directors/:directorName', (req,res)=> {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('not available')
    }
    
})
*/