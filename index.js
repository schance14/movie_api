const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User

mongoose.connect('mongodb://localhost:27017/cfDB', {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

let users = [
    {
        id: 1,
        name: "Lenny",
        Birthday: new Date("2000-03-18"),
        favoriteMovies: ["Mean Girls"]
       
    },
    {
        id: 2,
        name: "Patrick",
        Birthday: new Date("1990-08-06"),
        favoriteMovies: ["Lord of the Rings"]
    },
    {
        id: 3,
        name: "Wolfe",
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



app.listen(8080, ()=> {
    console.log('Your app is listening on port 8080.');
});