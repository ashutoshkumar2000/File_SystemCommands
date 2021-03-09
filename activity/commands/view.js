
//Main function
function viewExecuter(dirName, dirType){
    var viewDir = "" + dirName;
    var viewType = dirType;
    if(viewType == "--tree"){
        treeView(viewDir, "");
    }
    else if(viewType == "--flat"){
        flatView(viewDir);
    }
    else{
        console.log("Wrong command entered, enter help to see the list of all commands");
    }
}

//Extra functions
let fs = require("fs");

function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath){
    return fs.readdirSync(dirPath);
}

let path = require("path");

//Function to view this as a tree.
function treeView(dirPath, indent){
    let isFile = isFileChecker(dirPath);
    if(isFile == true){
        console.log(indent, path.basename(dirPath));
    }
    else{
        console.log(indent, path.basename(dirPath));
        let children = readContent(dirPath);
        for(let i = 0; i < children.length; i++){
            treeView(path.join(dirPath, children[i]), indent + '\t');
        }
    }
}

//Function to view this as a flat.
function flatView(dirPath){
    let isFile = isFileChecker(dirPath);
    if(isFile == true){
        console.log(dirPath + "*");
    }
    else{
        console.log(dirPath);
        let children = readContent(dirPath);

        for(let i = 0; i < children.length; i++){
            flatView(dirPath + "\\" + children[i]);
        }
    }
}

//Exports
module.exports = {
    viewFn : viewExecuter
}