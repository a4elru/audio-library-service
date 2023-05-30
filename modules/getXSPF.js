'use strict';

const { IP_ADDRESS, HTTP_PORT, EXTENSIONS } = require('../params');

const fs = require('fs');
const qs = require('node:querystring');
const path = require('path');
const { create } = require('xmlbuilder2');

function getXSPF(current_path) {
    const host = `http://${IP_ADDRESS}:${HTTP_PORT}/s`;
    const allFiles = getAllFiles(current_path, current_path);
    const root = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('playlist', { version: '1', xmlns: 'http://xspf.org/ns/0/' })
            .ele('title').txt('Music from Node.js').up() // eslint-disable-line indent
            .ele('trackList'); // eslint-disable-line indent
    for(let i = 0; i < allFiles.length; i++) {
        let loc = allFiles[i].split('/').map(x => qs.escape(x)).join('/');
        root    .ele('track')
                    .ele('location').txt(host + loc).up() // eslint-disable-line indent
                    .ele('title').txt(allFiles[i]).up() // eslint-disable-line indent
                .up(); // eslint-disable-line indent
    }
    return root.end({ prettyPrint: true });
}

function getAllFiles(root, dir, allFiles){
    allFiles = allFiles || [];
    let dirFiles = fs.readdirSync(dir);
    for (let i in dirFiles){
        let fullName = dir + '/' + dirFiles[i];
        if (fs.statSync(fullName).isDirectory()){
            getAllFiles(root, fullName, allFiles);
        } else {
            if (EXTENSIONS.includes(path.extname(dirFiles[i]).toLowerCase())) {
                allFiles.push(fullName.slice(root.length));
            } else {
                // console.log(`The file ${fullName} is ignored.`);
            }
        }
    }
    return allFiles;
};

module.exports = getXSPF;
