import { headOpts, headUrl, postOpts, postUrl } from "./requests";
import fetch, { Response } from 'node-fetch';
import { Readable } from 'stream';
import fs from 'fs';
import * as yazl from 'yazl';

run(main2);
// run(main);

// broken on Node.JS v16.13.0, working on Node.JS v14.18.0
async function main2() {
    const headResponse = await fetch(headUrl, headOpts);
    logResponse('HEAD response:', headResponse);

    const zipFile = new yazl.ZipFile();

    const read = fs.createReadStream(__dirname + '/../data/test.zip');
    zipFile.addReadStream(read, 'test');
    zipFile.end();

    read.on('error', (err) => {
        console.error(err);
    });

    console.log('Sending post request...');
    try {
        const postResponse = await fetch(postUrl, postOpts(new Readable().wrap(zipFile.outputStream)));
        logResponse('POST response: ', postResponse);
    } catch (e) {
        console.log('POST request failed.');
        console.error(e);
    }
}

// this method works as expected with all tested Node.JS versions
async function main() {
    const headResponse = await fetch(headUrl, headOpts);
    logResponse('HEAD response:', headResponse);

    const body = fs.createReadStream(__dirname + '/../data/test.zip');

    body.on('error', (err) => {
        console.error(err);
    });

    body.on('ready', () => {
        console.log('Stream is ready.');
    });

    console.log('Sending post request...');
    const postResponse = await fetch(postUrl, postOpts(body));
    logResponse('POST response:', postResponse);
}

async function run(func: () => Promise<void>) {
    console.log('Node.JS version:', process.version);
    console.time('Script duration');
    await func();
    console.timeEnd('Script duration');
}

function logResponse(prefix: string, response: Response) {
    console.log(prefix, {
        status: response.status,
        statusText: response.statusText,
    });
}