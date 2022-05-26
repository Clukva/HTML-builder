const fs = require('fs');
const path = require('path');

const pathText = path.join(__dirname, 'text.txt');

const stream = new fs.ReadStream(pathText, {encoding: 'utf-8'});

stream.on('readable', function(){
    let data = stream.read();
    data !== null ? console.log(data) : '';
})
