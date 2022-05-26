const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises');
const { RSA_NO_PADDING } = require('constants');
const { versions } = require('process');

let pathP = path.join(__dirname);
let pathStyle = path.join(__dirname, 'styles');
let pathProject = path.join(__dirname, 'project-dist');
let pathAssets = path.join(__dirname, 'project-dist', 'assets');


// папка
      fs.mkdir( pathProject ,{recursive: true}, e =>{
        if(e){
            console.error(e);
          } else {
            //console.log('Sucsess');
          }
        });

// вставка html
//innerHtml();
function innerHtml(){
  let indexHtmlRead = fs.createReadStream(pathP+'\\template.html', 'utf8');
  let indexHtmlWrite = fs.createWriteStream(pathProject+'\\index.html');
  indexHtmlRead.pipe(indexHtmlWrite);
  
  fs.readFile(pathP+'\\template.html', 'utf8', function(error, data){
  
      fs.readdir(pathP+'\\components', 'utf8', function(error, dataFooter){
  
        if(error) ;
        dataFooter.forEach( elem =>{
  
            if(error) throw error;
            if(path.extname(elem) !== '.html') return;
        
            let fff = elem.slice(0, -5).toString()
          fs.readFile(pathP+`\\components\\${fff}.html`, 'utf8', function(error, dataFoo){
            if(error){};
            data = data.replace(`{{${fff}}}`, dataFoo);
            fs.writeFile(pathProject+'\\index.html', data, 'utf8', (error) =>{
              if(error) throw error;
            })
          })
  
        })
    })
  })
  
}
innerHtml();
innerHtml();

// вставка стилей

fs.readdir(pathStyle, readdirCallBack, {withFileTypes: true});

function readdirCallBack(error, files){
    if(error){
      console.log('Error in reading');
    }else{
        deleteBundle();
        fileHandler();

           files.forEach(elem =>{
            fs.stat((pathStyle+'\\'+`${elem}`), (error, stats) => {
                if(error) throw error;
                if(!stats.isFile() || path.extname(elem) !== '.css') return;
                          
              fs.readFile(pathStyle+'\\'+`${elem}`, 'utf-8', (error, data)=>{
                  if(error){
                      throw error;
                  } else{
                    fs.appendFile(pathProject+ '\\style.css', data+'\n', function (err) {
                        if (err) throw err;
                    });
                 }
             })
          })
       })
    }
  }
function fileHandler(){
    fs.open( pathProject + '\\'+'style.css', 'w', (err) => {
        if(err){ 
            throw err;
        }
    })
}

function deleteBundle(){
    fs.unlink(  pathProject + '\\'+'style.css', err =>{
            if(err) console.log('add file');
      })
}

// копирование assets

fs.mkdir( pathAssets ,{recursive: true}, e =>{
  if(e){
      console.error(e);
    } else {
      //console.log('Sucsess');
    }
  })

function copyDir(){
  
  fs.readdir(pathP +"\\assets", readdirCallBack, {withFileTypes: true});
  
  function readdirCallBack(error, files){
   // console.log(files)
      if(error){
          console.log('Error in reading');
      }else{
        files.forEach(elem =>{
            fs.copyFile(pathP + '\\assets' +`\\${elem}`, pathAssets + `\\${elem}`, err => {
            if(err) ; 
          }); 
        }) 

        files.forEach(elem =>{

          fs.stat((pathP + `\\assets\\${elem}`), (error, stats) => {
            if(stats.isFile() ) return;

         fs.mkdir( pathAssets + `\\${elem}` ,{recursive: true}, e =>{
          if(e){
              console.error(e);
            } else {
            }
          }); 

          fs.readdir(pathP + `\\assets\\${elem}`, readdirCallBackIn, {withFileTypes: true});
          function readdirCallBackIn(error, files){
            if(error){
                console.log('Error inn reading');
            }else{
              let pathPin = path.resolve('06-build-page', 'assets', `${elem}`);
              let pathPout = path.resolve('06-build-page', 'project-dist', 'assets', `${elem}`);
              files.forEach(elem =>{
                fs.unlink(pathPout + '\\' + `${elem}` , err => {
                if(err) ;
              });
                fs.copyFile(pathPin +`\\${elem}`, pathPout + '\\' + `${elem}`, err => {
                  if(err) throw err; 
                }); 
              }) 
            }
          }
        })
        })
      }
  }

}

removeAssets();
deleteFold()
copyDir();


function removeAssets(){
  fs.readdir(pathAssets, readdirRemove, {withFileTypes: true});
  function readdirRemove(err, files){
    if(err){
      throw err;
    }else{
      files.forEach(elem =>{
        fs.stat((pathAssets+`\\${elem}`), (error, stats) => {
          if(error) throw error;
          if(stats.isFile() ){
            fs.unlink(pathAssets+`\\${elem}`, err => {
              if(err) throw err; 
           });
          }else{
            fs.readdir(pathAssets+`\\${elem}`, {withFileTypes: true}, (err, files) =>{
              if(err) throw err;
              else{
                files.forEach(el =>{
                    fs.unlink(pathAssets+`\\${elem}`+`\\${el.name}`, err => {
                      
                    if(err) ; 
                 });  
                })
              }
            })
          };
        })
      })
    } 
  }
 }

 function deleteFold(){
  fs.readdir(pathAssets, {withFileTypes: true}, (err, files) =>{
    if(err){};
    files.forEach( elem =>{

     fs.stat((pathAssets+`\\${elem.name}`), (error, stats) => {
       if(error){};
        try {
          fs.rmdir(pathAssets+`\\${elem.name}`, err => {
           if(err){} ; 
        });
              } catch (err) {
       }
     })
   })
    })
 }
