# fs-utils

a useful collection of utils for files and folders operations.

## how to install

    npm install @samwen/fs-utils --save

## how to use

    const { deleteFolderRecursive, listFolderRecursive, writeToGzipFile } = require('@samwen/fs-utils');
    
    deleteFolderRecursive('/tmp/test/test_folder');
    
    const list = listFolderRecursive('/tmp/test/test_folder');
    
    const str = 'test writeToGzipFile. verifies it should unzip back to the same text';
    writeToGzipFile('/tmp/filesys_test/test.txt.gz', str);
