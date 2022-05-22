const path = require('path');
const fs = require('fs');
let pathP = path.resolve('05-merge-styles', 'styles');
let pathPath = path.resolve('05-merge-styles', 'project-dist');

fs.readdir(pathP, readdirCallBack, {withFileTypes: true});

function readdirCallBack(error, files){
    if(error){
      console.log('Error in reading');
    }else{
        deleteBundle();
        fileHandler();


           files.forEach(elem =>{
            fs.stat((pathP+'\\'+`${elem}`), (error, stats) => {
                if(error) throw error;
                if(!stats.isFile() || path.extname(elem) !== '.css') return;
              
            
              fs.readFile(pathP+'\\'+`${elem}`, 'utf-8', (error, data)=>{
                  if(error){
                      throw error;
                  } else{
                    fs.appendFile(pathPath+ '\\bundle.css', data, function (err) {
                        if (err) throw err;
                       // console.log('Saved!');
                     });
                 }
             })
          })
       })
    }
  }
function fileHandler(){
    fs.open( pathPath + '\\'+'bundle.css', 'w', (err) => {
        if(err){ 
            throw err;
        }
    })
}

function deleteBundle(){
    fs.unlink(  pathPath + '\\'+'bundle.css', err =>{
            if(err) console.log('add file');
      })
}