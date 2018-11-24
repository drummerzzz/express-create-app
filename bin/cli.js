#! /usr/bin/env node

let path = require('path');
let fs = require('fs');
let os = require('os').platform();

const directorys = ['infra', 'public', 'models', 'routes', 'views']
const publicDirectorys = ['css', 'imgs', 'js', 'lib']
const filesdir = ['routes', 'bin'];
const filesName = ['route', 'config'];
const settingsFiles = './settings/';

let bar = "//";
if(os.indexOf('win') != -1) bar = "\\";
bar = bar.substring(0,1); // needing for escaping to \

let appName = process.argv[2];
let appDir = appName+bar+'app';

let pkg = {
    name: appName,
    version: '1.0.0',
    main: "./app.js",
    scripts: {
      start: 'node ./app'
    },
    dependencies: {
        "express": "^4.16.4",
        "express-load": "^1.1.16",
        //"http-errors": "~1.6.2"
    }
  }


function createProject(){
    console.clear();
    fs.mkdir(appName, (err)=>{
        if(!err){
            console.log('\x1b[36mSucess :) new project '+appName
            +' Created!\x1b[0m :\n 1 - CD TO '+appName.toLocaleUpperCase()
            +' folder\n 2 - Run the comamnd NPM INSTALL for install all dependences.\n 3 - Run NPM START');
            
            createJsonFile(appName+bar+'package', pkg);
            genaratefile('app',appName,'app.js');
            createDirectorys(appName, ['app','bin'], false);
            createDirectorys(appDir, directorys, true);
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
            if(!err){
                console.log('   \x1b[36mcreate\x1b[0m : ' +local)
                let index = filesdir.findIndex(obj => obj == dir);
                if(index !=-1){
                    genaratefile(filesName[index], local, filesName[index]+'.js');
                }
            };

        });
    });
    if(next){
        let publicDir = appName+bar+'app'+bar+directorys[1];
        createDirectorys(publicDir, publicDirectorys, false);
    }
}

function createJsonFile(name, package){
    fs.writeFileSync(name+'.json', JSON.stringify(package, null, 2), (err)=>{
        if(!err)console.log('   \x1b[36mcreate\x1b[0m : ' +name+'.json')
    });
}

function write (file, str) {
    fs.writeFileSync(file, str, 'utf-8')
    console.log('   \x1b[36mcreate\x1b[0m : ' + file)
  }  

function readFile(name){
    return fs.readFileSync(path.join(settingsFiles, name)).toString('utf-8');
}

function genaratefile(read, dir,name){
    let data = readFile(read);
    if(data) write(path.join(dir, name), data);
}

module.exports = createProject();
