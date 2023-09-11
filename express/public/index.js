const express = require('express'),
    morgan = require('morgan');

const app = express();

app.use(morgan('common'));


let topMovies = [
    {
        title: 'The Twilight Saga'
    },
    {
        title: 'Lord of the Rings'
    },
    {
        title: 'Harry Potter and the Prisoner of Azkaban'
    },
    {
        title: 'Team America: World Police'
    },
    {
        title: 'Tropic Thunder'
    },
    {
        title: 'The Great Gatsby'
    },
    {
        title: 'Inglorious Basterds'
    },
    {
        title: 'Mean Girls'
    },
    {
        title: '21 Jump Street'
    },
    {
        title: 'Scream'
    }
]; 

app.get('/', (req, res)=> {
    res.send('Welcome to Movie Flix!');
});

app.get('/movies', (req, res)=> {
    res.json(topMovies);
});

app.use('/documentation.html', express.static('public'));

app.use ((err, req, res)=> {
    console.error(err.stack);
    res.status(500).send('There has been an error!');
});


app.listen(8080, ()=> {
    console.log('Your app is listening on port 8080.');
});