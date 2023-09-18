const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

    app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Lenny",
        favoriteMovies: ["Mean Girls"]
    },
    {
        id: 2,
        name: "Patrick",
        favoriteMovies: ["Lord of the Rings"]
    },
]


let movies = [
    {
        "title": "The Twilight Saga",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Lord of the Rings",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Team America: World Police",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Tropic Thunder",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "The Great Gatsby",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Inglorious Basterds",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Mean Girls",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "21 Jump Street",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

        },
        
        "imageUrl":""
    },
    {
        title: "Scream",
        "description": "",
        "genre": {
            "name":"",
            "description":""
        },
        "director": {
            "name":"",
            "description":"",
            "birth":""

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
    const movie = movies.find( movie => movie.genre.name === genreName).genre;

    if (movie) {
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