const path = require('path');
const fs = require('fs');
const pathText = path.join(__dirname, 'text.txt');

function fileHandler(){
    fs.open(pathText, 'w',(err) => {
        if(err) throw err;
    })
}

fileHandler();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Enter text!!!' + '\n', (answer) => {

    if(!answer.includes('exit')){
        fs.appendFile(pathText, `${answer}` + '\n', (err) => {
            if(err){
                console.log(err);
            }
        })
    }

    if(answer.includes('exit')){
        console.log('Bye!!!');
        process.exit(0);
    }

    readline.on('line', line => {

        if(!line.includes('exit')){
            fs.appendFile(pathText, `${line}` + '\n', (err) => {
                if (err) {
                    console.log(err);
                } 
            })
        }

        if(line.includes('exit')){
            console.log('Bye!!!')
            process.exit(0);
        }
    })

})

readline.addListener('close', () => {
    console.log('Bye!!!')
})
