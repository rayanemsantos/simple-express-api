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

const recentlyplayed = [
    {
        "title": "This is Charlie Brown Jr.",
        "subtitle":
            "Da baixada santista para os maiores palcos do Brasil! Relembre os grandes sucessos da banda.",
        "type": "playlist"
    },
    {
        "title": "Indo e Voltando",
        "type": "podcast"
    },
    {
        "title": "QuebraDev",
        "type": "podcast"
    },
    {
        "title": "Frozen 2 (Original Motion Picture Soundtrack)",
        "type": "álbum"
    },
    {
        "title": "Indigo Borboleta Anil",
        "type": "álbum"
    },
    {
        "title": "Sextou Gostosin",
        "type": "playlist"
    }
]

const podcasts = [
    {
        "title": "Indo e Voltando",
        "type": "podcast"
    },
    {
        "title": "QuebraDev",
        "type": "podcast"
    },
    {
        "title": "Café da Manhã",
        "subtitle": "Spotify Studios",
        "type": "podcast"
    },
    {
        "title": "Histórias de Ninar para Garotas Rebeldes",
        "type": "podcast"
    },
    {
        "title": "Layers Ponto Tech",
        "type": "podcast"
    }
]

const dailymixes =  [
    {
        "title": "Daily Mix 1",
        "subtitle": "Luedji Luna, Charlie Brown Jr., Tom Zé e mais",
        "type": "daily mix"
    },
    {
        "title": "Daily Mix 2",
        "subtitle": "Epic Nature, Skyyy, HD Rain and Water e mais",
        "type": "daily mix"
    },
    {
        "title": "Daily Mix 3",
        "subtitle": "Liniker, Linn da Quebrada, Valuá e mais",
        "type": "daily mix"
    },
    {
        "title": "Daily Mix 4",
        "subtitle": "Cardi B, Lizzo, Doja Cat e mais",
        "type": "daily mix"
    },
    {
        "title": "Daily Mix 5",
        "subtitle":
            "Kristen Anderson-Lopez, Kristen Bell, Christopher Jackson e mais",
        "type": "daily mix"
    },
    {
        "title": "Daily Mix 6",
        "subtitle": "Alaska Thunderfuck, Jessie Ware, Billie Eilish e mais",
        "type": "daily mix"
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

// PODCASTS
app.get('/api/podcasts', (re, res) => {
    return res.status(200).json(podcasts);   
});

// MUSICS
app.get('/api/recently_played', (re, res) => {
    return res.status(200).json(recentlyplayed);   
});
app.get('/api/dailymixes', (re, res) => {
    return res.status(200).json(dailymixes);   
});

app.listen(21262, () => {
    console.log('Express started at http://localhost:21262')

});