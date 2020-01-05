/* eslint-disable no-undef */
'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const { execSync } = require('child_process');
const {
    deleteFolderRecursive,
    listFolderRecursive,
    writeToGzipFile
} = require('../src');

describe('test deleteFolderRecursive', () => {

    it('verifies it should cleanup the folder', async () => {

        const stdout1 = execSync('rm -rf /tmp/filesys_test; unzip test/test_folder.zip -d /tmp/filesys_test');

        assert.isNotNull(stdout1);
        const str1 = stdout1.toString();

        const count1 = (str1.match(/\n/g) || []).length;
        expect(count1).greaterThan(6);
        
        deleteFolderRecursive('/tmp/filesys_test/test_folder');

        const stdout2 = execSync('ls /tmp/filesys_test');

        assert.isNotNull(stdout2);
        const str2 = stdout2.toString();

        const count2 = (str2.match(/\n/g) || []).length;
        expect(count2).equals(0);
    });
});

describe('test listFolderRecursive', () => {

    it('verifies it should return all files under a folder', async () => {

        const stdout1 = execSync('rm -rf /tmp/filesys_test; unzip test/test_folder.zip -d /tmp/filesys_test');

        assert.isNotNull(stdout1);
        const str1 = stdout1.toString();

        const count1 = (str1.match(/\n/g) || []).length;
        expect(count1).greaterThan(6);
        
        const list = listFolderRecursive('/tmp/filesys_test/test_folder');

        assert.isNotNull(list);
        expect(JSON.stringify(list)).equals('["a","sub_folder/b","sub_folder/sub_sub_folder/c"]');
    });
});

describe('test writeToGzipFile', () => {

    it('verifies it should unzip back to the same text', async () => {

        execSync('rm -rf /tmp/filesys_test ; mkdir /tmp/filesys_test');

        const str1 = 'test writeToGzipFile. verifies it should unzip back to the same text';
        
        writeToGzipFile('/tmp/filesys_test/test.txt.gz', str1);

        await sleep(100);

        const stdout2 = execSync('cd /tmp/filesys_test/ ; gunzip test.txt.gz ; cat test.txt');

        assert.isNotNull(stdout2);
        const str2 = stdout2.toString();
        expect(str2).equals(str1);
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
