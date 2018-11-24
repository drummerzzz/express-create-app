let exec = require('child_process').exec;
let path = require('path');
let fs = require('fs');
let os = require('os').platform();

const directorys = ['bin', 'public', 'routes', 'setup', 'views']
const publicDirectorys = ['css', 'imgs', 'js', 'lib']
let apiName = process.argv[2];
let bar = "//";
if(os.indexOf('win') != -1) bar = "\\";
bar = bar.substring(0,1); // needing for escaping to \

let pkg = {
    name: apiName,
    version: '1.0.0',
    scripts: {
      start: 'node ./app'
    },
    dependencies: {
        "express": "^4.16.4",
        "express-load": "^1.1.16"
    }
  }

console.clear();
function createProject(){
    fs.mkdir(apiName, (err)=>{
        if(!err){
            console.log('   \x1b[36mcreate\x1b[0m : ' +apiName);
            createJsonFile(apiName+bar+'package', pkg)
            createDirectorys(apiName,directorys, true);
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
        createDirectorys(apiName+bar+directorys[1], publicDirectorys, false);
    }
}

function removeProject(callback){
    new exec('rm -rf '+apiName, (err)=>{
        callback(err);
    });
}

function createJsonFile(name, package){
    fs.writeFileSync(name+'.json', JSON.stringify(package, null, 2), (err)=>{
        if(!err)console.log('   \x1b[36mcreate\x1b[0m : ' +name+'.json')
    });
}


module.exports = createProject();


