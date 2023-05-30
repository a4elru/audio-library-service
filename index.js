'use strict';

const { STATIC_PATH, HTTP_PORT } = require('./params');

const express = require('express');
const http = require('http');
const getXSPF = require('./modules/getXSPF');

const app = express();

app.get('/', async (request, response) => {
    response.redirect('playlist.xspf');
});

app.get('/playlist.xspf', async (request, response) => {
    response.set('Content-Type', 'application/xspf+xml');
    response.send(getXSPF(STATIC_PATH));
});

app.use('/s', express.static(STATIC_PATH));

http.createServer(app).listen(HTTP_PORT, () => {
    console.log('Server listens http://localhost:' + HTTP_PORT);
});
