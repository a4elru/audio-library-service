'use strict';

const params = {};

params.HTTP_PORT = process.env['HTTP_PORT'] || 3333;
params.IP_ADDRESS = process.env['IP_ADDRESS'] || '192.168.1.165';
params.STATIC_PATH = process.env['STATIC_PATH'] || 'D:/Music';
params.EXTENSIONS = [
    '.mp3',
    '.ogg',
    // '.mid',
    // '.midi',
];

Object.freeze(params);
module.exports = params;
