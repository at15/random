/**
 * Created by at15_000 on 2015/1/19.
 */
var express = require('express');
var glob = require('glob');
var path = require('path');
var app = express();

app.get('/music', function (req, res) {
    console.log('need a new song!');
    // grab all the mp3 files and serve one.
    var files = glob.sync('music/*.mp3', {});
    var i = parseInt(Math.random() * files.length);
    //res.send(files[i]);
    res.sendFile(path.resolve(files[i]));
});

app.listen(3001);
console.log('random server start');

setInterval(function(){
    console.log('i am working la la la');
},1000*10);