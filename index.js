const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://uniforspotifyproject:7BTKZRmGja2Yjed@spotifynodeapp.xpryx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
const db = client.db("spotify");

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
        "owner": "spotify",
        "user": "61b247a759efecd7d4958a07",
        "musics": [
            "61b268d065e41d9fdbf4eed9",
            "61b268d065e41d9fdbf4eeda",
            "61b268d065e41d9fdbf4eedb",
            "61b268d065e41d9fdbf4eedc",
            "61b268d065e41d9fdbf4eedd",
            "61b268d065e41d9fdbf4eede"
        ]

    },
    {
        "id": 2,
        "title": "PRIDE Orgulho Tropical",
        "subtitle": "Sucessos e novidades de artistas Brasileires LGBTQ+ que nos enchem de orgulho! Foto: MEL",
        "type": "playlist",
        "link": "orgulho-tropical",
        "playlist": "orgulhotropical",
        "owner": "spotify",
        "user": "61b247a759efecd7d4958a07",
        "musics": [
            "61b268d065e41d9fdbf4eedc",
            "61b268d065e41d9fdbf4eedd",
            "61b268d065e41d9fdbf4eede"
        ]
    },
    {
        "id": 3,
        "title": "Brega Funk",
        "subtitle":
            "Os grandes hinos da união do Brega com o Funk. Foto: Ruivinha de Marte.",
        "type": "playlist",
        "link": "brega-funk",
        "playlist": "bregafunk",
        "owner": "spotify",
        "user": "61b247a759efecd7d4958a07",
        "musics": [
            "61b268d065e41d9fdbf4eede"
        ]
    },
    {
        "id": 4,
        "title": "Frevo & Folia",
        "subtitle": "De Spotify",
        "type": "playlist",
        "link": "frevo-folia",
        "playlist": "frevofolia",
        "owner": "spotify",
        "user": null,
        "musics": [
            "61b268d065e41d9fdbf4eedc",
        ]
    },
    {
        "id": 5,
        "title": "Equal Brasil",
        "subtitle": "Liniker e mais mulheres para serem ouvidas no máximo volume.",
        "type": "playlist",
        "link": "equal-brasil",
        "playlist": "equalbrasil",
        "owner": "spotify",
        "user": null,
        "musics": [
            "61b268d065e41d9fdbf4eedd",
        ]
    }
]
const tracks =  [
    {
        "title": "Daily Mix 1",
        "subtitle": "Luedji Luna, Charlie Brown Jr., Tom Zé e mais",
        "type": "track",
        "artist": "Luedji Luna",
        "album": "Luedji Luna Album",
        "durantion":"3:35"
    },
    {
        "title": "Daily Mix 2",
        "subtitle": "Epic Nature, Skyyy, HD Rain and Water e mais",
        "type": "track",
        "artist": "Epic Nature",
        "album": "Epic Nature Album",
        "durantion":"3:35"
    },
    {
        "title": "Daily Mix 3",
        "subtitle": "Liniker, Linn da Quebrada, Valuá e mais",
        "type": "track",
        "artist": "Liniker",
        "album": "Liniker Album",
        "durantion":"3:35"
    },
    {
        "title": "Daily Mix 4",
        "subtitle": "Cardi B, Lizzo, Doja Cat e mais",
        "type": "track",
        "artist": "Cardi B",
        "album": "Cardi B Album",
        "durantion":"3:35"
    },
    {
        "title": "Daily Mix 5",
        "subtitle":"Kristen Anderson-Lopez, Kristen Bell, Christopher Jackson e mais",
        "type": "track",
        "artist": "Kristen Anderson-Lopez",
        "album": "Kristen Anderson-Lopez Album",
        "durantion":"3:35"
    },
    {
        "title": "Daily Mix 6",
        "subtitle": "Alaska Thunderfuck, Jessie Ware, Billie Eilish e mais",
        "type": "track",
        "artist": "Alaska Thunderfuck",
        "album": "Alaska Thunderfuck Album",
        "durantion":"3:35"
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

// USERS 
app.post('/api/user/register', (req, res) => {     
    const user = db .collection("users")
    user
    .findOne({email:req.body.email}, function (err, result) {
        if (err) {
            res.status(400).send("Error checking user");
        } else {
        if (result)
            res.status(400).send({error: true, message: "User already exists"});
        else
            user
            .insertOne(req.body, (function (err, result) {
                if (err) {
                res.status(400).send("Error creating user");
            } else {
                res.json({id: result.insertedId});
                }
            })); 
        }
    })     
    return res
});

app.post('/api/user/login', (req, res) => {  
    const user = db .collection("users")   
    user
    .findOne({email:req.body.email}, function (err, result) {
      if (err) {
        res.status(400).send("Error authenticating user");
     } else {
        if (result)
            res.json(result);
        else
            res.status(400).send({error: true, message: "Object does not exist"});
      }
    });      
    return res
});

app.put('/api/user/update', (req, res) => {     
    const user = db .collection("users")   
    user
    .updateOne({_id: new ObjectId(req.body.id)}, { $set: {...req.body} }, function (err, result) {
      if (err) {
        res.status(400).send("Error updating user");
     } else {
        if (result && result.acknowledged)
            res.json(result);
        else
            res.status(400).send({error: true, message: 'Error updating user'});
      }
    });      
    return res
});

// MUSICS
app.get('/api/musics', (req, res) => {
    var type = req.params.type;
    const music = db .collection("musics")   
    music
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });     
    return res
});


app.post('/api/musics/', (req, res) => {
    const music = db .collection("musics")   
    music
    .insertMany(tracks, function (err, result) {
      if (err) {
        res.status(400).send("Error listing musics");
     } else {
        res.json(result);
      }
    });      
    return res
});


// PLAYLISTS
app.get('/api/playlists/:id', (re, res) => {
    var id = re.params.id;  
    db
    .collection("playlists")
    .findOne({_id: new ObjectId(id)}, async function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        const music = db .collection("musics")   
        var musics = []
        var pro2 = null 
        const pro = new Promise((resolve, reject) => {
            resolve(result.musics.map(async (r) => {
                pro2 = new Promise((resolve2, reject2) => { 
                    music
                    .findOne({_id: new ObjectId(r)}, function (err, resultMusic) {
                        if (err) {
                            console.log(err)
                            reject2()
                        } else {
                            musics.push(resultMusic)
                            resolve2()
                        }
                    });
                })
            }))  
        })  
        Promise.all([pro, pro2]).then(() => {
            res.json({...result, musics:musics}); 
        })
      }
    });      
    return res
});

app.put('/api/playlists/:id/music/:id_music/remove', (re, res) => {
    var id = re.params.id;  
    var id_music = re.params.id_music;  
    db
    .collection("playlists")
    .updateOne({_id: new ObjectId(id)}, { $pull: {
        musics: id_music
    }}
    , function (err, result) {
        if (err) {
          res.status(400).send("Error updating user");
       } else {
          if (result)
              res.json(result);
          else
              res.status(400).send({error: true, message: 'Error updating user'});
        }
    });    
    return res
});

app.post('/api/playlists/music/:music_id/add', (req, res) => {
    var music_id = req.params.music_id;  
    var user = req.body.user;  
    let playlist = {
        user: user,
        title: "Sua nova playlist",
        type: "playlist",
        link: "afrobeat-essentials",
        playlist: "nova-playlist",
        owner: "spotify",        
        musics: [music_id]
    }
    db
    .collection("playlists")
    .insertOne(playlist, async function (err, result) {
      if (err) {
        res.status(400).send("Error adding playlist!");
     } else {
        res.json(result);
      }
    });      
    return res
});

app.get('/api/playlists', (req, res) => {  
    var user_id = req.query.user;  
    db
    .collection("playlists")
    .find(user_id ? {user: user_id} : {user: null})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });      
    return res
});

app.post('/api/playlists', (req, res) => {
    const music = db .collection("playlists")   
    music
    .insertMany(playlists, function (err, result) {
      if (err) {
        res.status(400).send("Error listing musics");
     } else {
        res.json(result);
      }
    });      
    return res
});

app.listen(21262, () => {
    console.log('Express started at http://localhost:21262')

});