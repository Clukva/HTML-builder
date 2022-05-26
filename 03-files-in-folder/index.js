const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises');

let pathP = path.join(__dirname, 'secret-folder');


 fs.readdir(pathP, readdirCallBack, {withFileTypes: true});

function readdirCallBack(error, files){
    if(error){
        console.log('Error');
        console.log(error.message);
    }else{
        files.forEach(elem =>{
            fs.stat((pathP+'\/'+`${elem}`), (error, stats) => {
                if(error) throw error;
                if(!stats.isFile()) return;
                let size = Math.round(stats.size*1000/1024)/1000 + 'kb'; 
                let ename = path.extname(elem);
                let bname = path.basename(elem, ename);
                let ans = bname +' - '+ ename.slice(1) + ' - ' + size;
                console.log(ans)
            })
        })
        }
    }
