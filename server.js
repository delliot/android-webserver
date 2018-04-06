const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const parse = require('csv-parse/lib/');
const port = process.env.PORT || 5000;

const csvpath = (process.env.NODE_ENV === "production") ? "/opt/android-server/AndroidServer/src/data_gps/"
    : __dirname;

if(process.env.NODE_ENV === "production")
{
    app.use('/', express.static(`$(__dirname)/client/build`));
}


app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
    res.send("hello world")
});



app.get('/ping', function (req, res) {
    return res.send('pong');
});






app.get('/api/users', (req, res) => {

});

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

app.listen(port, () => console.log(`Listening on port ${port}`));