var express = require('express');
var app = express();
app = express(); 
app.use('/', express.static(__dirname + '/'));
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://arjsproject.firebaseio.com"
  });

var database = firebase.database();

app.get('/locations', async (request, response) => {
    try {
        let result = []
        const locationsRef = database.ref('locations');
        const locations = await locationsRef.once('value');
        locations.forEach(function(snapshot) {
            result.push({
                name:snapshot.val().name,
                desciption:snapshot.val().desciption?snapshot.val().desciption:'Empty Description',
                location: {
                    lat:snapshot.val().lat,
                    lng:snapshot.val().lng,
                }
            });
        })
      response.json(result);
  
    } catch(error){
  
      response.status(500).send(error);
  
    }
  
});


const http = require('http');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});

