const express = require('express');
const cors = require('cors')({origin: true});

const app = express();
app.use(express.json());
app.use(cors);

const playlists = [
    {
        "id": 1,
        "title": "Afrobeat Essentials",
        "subtitle":"From Fela Kuti to Antibalas, enjoy a collection of timeless Afrobeat music!",
        "type": "playlist",
        "link": "afrobeat-essentials",
        "playlist": "afrobeatessentials",
        "owner": "spotify"
    },
    {
        "id": 2,
        "title": "PRIDE Orgulho Tropical",
        "subtitle": "Sucessos e novidades de artistas Brasileires LGBTQ+ que nos enchem de orgulho! Foto: MEL",
        "type": "playlist",
        "link": "orgulho-tropical",
        "playlist": "orgulhotropical",
        "owner": "spotify"
    },
    {
        "id": 3,
        "title": "Brega Funk",
        "subtitle":
            "Os grandes hinos da união do Brega com o Funk. Foto: Ruivinha de Marte.",
        "type": "playlist",
        "link": "brega-funk",
        "playlist": "bregafunk",
        "owner": "spotify"
    },
    {
        "id": 4,
        "title": "Frevo & Folia",
        "subtitle": "De Spotify",
        "type": "playlist",
        "link": "frevo-folia",
        "playlist": "frevofolia",
        "owner": "spotify"
    },
    {
        "id": 5,
        "title": "Equal Brasil",
        "subtitle": "Liniker e mais mulheres para serem ouvidas no máximo volume.",
        "type": "playlist",
        "link": "equal-brasil",
        "playlist": "equalbrasil",
        "owner": "spotify"
    }
]

//API ROUTES
app.use('/routes',function(req, res, next){
    var routes = []
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            routes.push({path:r.route.path, methods:r.route.methods})
        }
    })
    return res.status(200).json(routes) && next();
});

// PLAYLISTS
app.get('/api/playlists/:id', (re, res) => {
    var id = re.params.id;
    let playlist = playlists.find((p) => p.id == id)
    if (playlist){
        return res.status(200).json(playlist);   
    }
    return res.status(400).json({"error": true, "message": "object does not exist"});   
});

app.get('/api/playlists', (re, res) => {
    return res.status(200).json(playlists);   
});

app.listen(21262, () => {
    console.log('Express started at http://localhost:21262')

});