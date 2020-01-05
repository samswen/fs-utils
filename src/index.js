'use strict';

const { 
    existsSync, 
    unlinkSync, 
    lstatSync, 
    readdirSync, 
    rmdirSync ,
    createWriteStream
} = require('fs');

const zlib = require('zlib');

module.exports = {
    deleteFolderRecursive,
    listFolderRecursive,
    writeToGzipFile
};

// delete a folder completely
//
function deleteFolderRecursive(path) {
    if (!existsSync(path)) {
        return;
    }
    readdirSync(path).forEach(function(file) {

        const new_path = path + '/' + file;
        if (lstatSync(new_path).isDirectory()) { 
            deleteFolderRecursive(new_path);
        } else {
            unlinkSync(new_path);
        }
    });
    rmdirSync(path);
}

// list all files under a folder with relative path
// arguments: list and prefix are used internally for recursive call
//
function listFolderRecursive(path, list = null, prefix = null) {

    if (!existsSync(path)) {
        return null;
    }
    if (!lstatSync(path).isDirectory()) {
        return [ path ];
    }
    if (!list) {
        list = [];
    }
    readdirSync(path).forEach(function(file) {

        const new_path = path + '/' + file;
        const new_prefix = (prefix ? prefix + '/': '') + file;
        if (lstatSync(new_path).isDirectory()) { 
            listFolderRecursive(new_path, list, new_prefix);
        } else {
            list.push(new_prefix)
        }
    });
    if (!prefix) {
        return list;
    } 
}

function writeToGzipFile(path,  data) {
    const gzip = zlib.createGzip({level: 9});
    const file = createWriteStream(path);
    gzip.pipe(file);
    gzip.write(data);
    gzip.end();
}

