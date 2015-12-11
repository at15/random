/**
 * Created by at15_000 on 2015/1/19.
 */
var express = require('express');
var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var morgan = require('morgan');
var logger = require('log4js').getLogger('random');
var app = express();


var server = {
    config: config
};

var audioConfig = {};
var imageConfig = {};


function config(options) {
    if (options.debug === true) {
        app.use(morgan('combined'));
        logger.setLevel('DEBUG');
    } else {
        logger.setLevel('INFO');
    }

    if (typeof options.audio === 'undefined') {
        logger.warn('audio is not specified!');
    } else {
        configAudio(options.audio);
    }

    if (options.port && parseInt(options.port)) {
        listen(options.port);
    } else {
        logger.warn('port is not specified!');
    }
}

function configAudio(config) {
    logger.info('config audio');
    // TODO: add check here
    audioConfig = config;
    logger.debug(audioConfig);

    // serve audio
    app.get('/music', function (req, res) {
        logger.debug('requesting new audio');
        var globPatterns = [];
        var group = 'default';
        if (typeof req.query.group !== 'undefined') {
            group = req.query.group;
        }

        // check group
        logger.debug('got group query for audio');
        if (audioConfig[group]) {
            logger.debug('got group ' + group);
            globPatterns = audioConfig[group];
        } else {
            logger.warn('group ' + group + ' not found');
            res.status(404).end();
            return;
        }

        // glob
        var files = [];
        _.forEach(globPatterns, function (pattern) {
            logger.debug(pattern);
            // TODO: will sync return undefined or []?
            files = files.concat(glob.sync(pattern));
        });
        files = _.unique(files);
        if (files.length === 0) {
            logger.warn('no file found using pattern provided');
            res.status(404).end();
        } else {
            var i = parseInt(Math.random() * files.length);
            // resolve to current working directory
            res.sendFile(path.resolve(files[i], ''));
        }
    });

    // api for debug
    app.get('/music/groups', function (req, res) {
        res.json(audioConfig);
    });
}

function configImage() {

}


// serve image, TODO: support on the fly image cut

function listen(port) {
    app.listen(port);
    logger.info('server init on port ' + port);
}

module.exports = server;