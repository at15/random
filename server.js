/**
 * Created by at15_000 on 2015/1/19.
 */
var express = require('express');
var glob = require('glob');
var path = require('path');
var config = require('./config');
var app = express();

app.get('/music', function (req, res) {
    console.log('need a new song!');
    // grab all the mp3 files and serve one.
    var files = glob.sync('music/*.mp3', {});
    var i = parseInt(Math.random() * files.length);
    res.sendFile(path.resolve(files[i]));
});

app.listen(config.port);
console.log('random server start');

if(config.debug){
    setInterval(function(){
        console.log('i am working la la la');
    },1000*10);
}