//This is the Express Server for the google maps API site. It serves an API as well as statically serves a React App.
//It's primary purpose is parsing the CSV file into JSON and sending it to the client.
//Programmer and Designer: Delan Elliot
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const parse = require('csv-parse/lib/');
const port = process.env.PORT || 5000;
const basicAuth = require('express-basic-auth')
const csvpath = (process.env.NODE_ENV === "production") ? "/opt/android-server/AndroidServer/src/data_gps/"
    : __dirname;


var https = require('https');

var sslPath = '/etc/letsencrypt/live/delanelliot.com/';

var options = {
    key: fs.readFileSync(sslPath + 'privkey.pem'),
    cert: fs.readFileSync(sslPath + 'fullchain.pem')
};




app.use(basicAuth({
	users: { 'admin': 'trackm3' },
	challenge: true,
	realm: 'delanrealm1234',
}));

app.use(express.static('client/build'));

app.get('/api/gps', (req, res) => {

    updateData();
    res.send({data:output});
});


let output = [];

let parser = parse({delimiter:','});
parser.on('readable', function(){
    let record;
    while(record = parser.read()) {
        output.push(record);
    }
});

parser.on('error', function(err){
    console.log(err.message);
});

function updateData() {
    fs.readdir(csvpath, function(err, items){

        let files = items;

        for (var f in files) {
            if (path.extname(files[f]) === '.csv') {
                fs.readFile(csvpath + "/" + files[f], "utf8", (err, data) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        parser.write(data);
                    }
                });
            }

        }
    });
}



https.createServer(options, app).listen(443);
