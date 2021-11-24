const axios = require('axios');
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// const http = require("http");

app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.get('/api/population', function(req, res) {
    let url = `http://sedac.ciesin.columbia.edu/geoserver/wms`;
    // let url = `http://api.github.com/users`;

    axios({
        method:'get',
        url,
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.get('/api/expansion', function(req, res) {
    let url = `http://sedac.ciesin.columbia.edu/geoserver/wms`;

    axios({
        method:'get',
        url,
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});
