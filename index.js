const app = require('express')();
const got = require('got');

const redirect = (url, res) => got(url, {json: true})
        .then(response => res.json(response.body))
        .catch(error => {
            if (error && error.statusCode) {
                res.status(error.statusCode).json({message: error.message});
            } else {
                res.status(500).json({message: 'Error'});
            }
        });

app.get('/', (req, res) => res.send('Welcome'));

app.get('/search/shows', (req, res) => {
    redirect('http://api.tvmaze.com/search/shows?q=' + req.query.q, res);
});

app.get('/shows/:id', (req, res) => {
    redirect('http://api.tvmaze.com/shows/'+ req.params.id +'?embed=episodes', res);
});

app.listen(3000);
