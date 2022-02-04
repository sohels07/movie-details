const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/search', (req, res) =>{
    res.render('search');
});

app.get('/results', (req, res) =>{

    let query =  req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=6bec8c8361aab55305eb8079068e917e&query='+query, (error, response, body) =>{
        if(error){
            console.log(error);
        }

        // As we are getting the data in form of string, so we will convert that string into JSON using below line
        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});

    });

    
});

app.listen(3000, ()=>{
    console.log('Server started at port 3000');
});