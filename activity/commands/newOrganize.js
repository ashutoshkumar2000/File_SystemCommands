
let types = {
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
let fs = require("fs");
let path = require("path");
/*------------------------------------------create organized_file----------------------------------------------*/
function dirCreator(dirPath) {
    if(fs.existsSync(dirPath) == false){
        fs.mkdirSync(dirPath);
    }
}

function organizeFn(dirPath){
    let orgFilePath = path.join(dirPath, "organized_files");
    dirCreator(orgFilePath);
    for(let key in types){
        let innerdirPath = path.join(orgFilePath, key);
        dirCreator(innerdirPath);
    }

    //others
    let otherPath = path.join(orgFilePath, "others");
    dirCreator(otherPath);
    OrganizeDir(dirPath, orgFilePath);
}


/*------------------------------------------checkers and readers----------------------------------------------*/

function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function checkExt(dirPath){
    return path.extname(dirPath).slice(1);
}

function readContent(dirPath){
    return fs.readdirSync(dirPath);
}

/*------------------------------------------copy and paste in organized_path----------------------------------------------*/
function OrganizeDir(src, dest){
    let isFile = isFileChecker(src);
    if(isFile == true){
        let fileExt = checkExt(src);
        let flag = false;
        for(let type in types){
            for(let i = 0; i < types[type].length; i++){
                if(types[type][i] == fileExt){
                    let newDest = dest + "\\" + type +"\\"+ path.basename(src);
                    fs.copyFileSync(src, newDest);
                    flag = true;
                }
            }
        }
        if(flag == false){
            let newDest = dest + "\\" + "others" +"\\"+ path.basename(src);
            fs.copyFileSync(src, newDest);
        }
    }
    else{
        let children = readContent(src);
        for(let i = 0; i < children.length; i++){
            OrganizeDir(path.join(src, children[i]), dest);
        }
    }
}
module.exports = {
    organizeFn : organizeFn
}

