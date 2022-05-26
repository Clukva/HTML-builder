const path = require('path');
const fs = require('fs');

let pathP = path.join(__dirname, 'files');
let pathPath = path.join(__dirname, 'files-copy');



function copyDir(){
    fs.readdir(pathPath, readdirCallBackCopy, {withFileTypes: true});

    function readdirCallBackCopy(error, files){
        if(error){
            console.log('Error in reading');
        } else {
            files.forEach(el => {
                fs.unlink( pathPath +'\\'+ `${el}`, err => {
                    if(err) throw err;
                })
            })
        }
    }
    
    fs.readdir(pathP, readdirCallBack, {withFileTypes: true});
    
    function readdirCallBack(error, files){
        if(error){
            console.log('Error in reading');
        }else{
            fs.mkdir( pathPath ,{recursive: true}, e => {
                if(e){
                    console.error(e);
                } else {
              //console.log('Sucsess');
            }
        });
        
        files.forEach(elem =>{
            fs.copyFile(pathP + '\\' +`${elem}`, pathPath + '\\' + `${elem}`, err => {
                if(err) throw err;
                console.log('Файл успешно скопирован');
            });
        })
    }
}
}

copyDir();
