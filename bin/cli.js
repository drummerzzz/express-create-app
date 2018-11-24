#! /usr/bin/env node

let path = require('path');
let fs = require('fs');
let os = require('os').platform();

const directorys = ['bin', 'public', 'models', 'routes', 'views', 'setup']
const publicDirectorys = ['css', 'imgs', 'js', 'lib']

let appName = process.argv[2];

let bar = "//";
if(os.indexOf('win') != -1) bar = "\\";
bar = bar.substring(0,1); // needing for escaping to \

let pkg = {
    name: appName,
    version: '1.0.0',
    scripts: {
      start: 'node ./app'
    },
    dependencies: {
        "express": "^4.16.4",
        "express-load": "^1.1.16"
    }
  }


function createProject(){
    console.clear();
    fs.mkdir(appName, (err)=>{
        if(!err){
            console.log('   \x1b[36mcreate\x1b[0m : ' +appName);
            createJsonFile(appName+bar+'package', pkg)
            createDirectorys(appName,directorys, true);
        }else{
            if(err.code == 'EEXIST')
                console.log('ERROR!! - a directory with this name already exists!')
        }
    });
}


function createDirectorys(base, dirs, next){
    dirs.forEach(dir => {
        let local = path.join(base, dir)
        fs.mkdir(local, (err)=>{
            if(!err)console.log('   \x1b[36mcreate\x1b[0m : ' +local)
        });
    });
    if(next){
        createDirectorys(appName+bar+directorys[1], publicDirectorys, false);
    }
}


function createJsonFile(name, package){
    fs.writeFileSync(name+'.json', JSON.stringify(package, null, 2), (err)=>{
        if(!err)console.log('   \x1b[36mcreate\x1b[0m : ' +name+'.json')
    });
}


module.exports = createProject();


