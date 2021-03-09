// commands->
// view --tree, --flat
//  organize-> same folder , multiple folder
// help
// [node ,mycli.js ,view ,dirName ,mode]
// node mycli.js organize -/foldername
// node mycli.js help
// let helpFile = require("./commands/help");
// helpFile.helpFn();

let {helpFn} = require("./commands/help");
let {organizeFn} = require("./commands/newOrganize");
let {viewFn} = require("./commands/view");

let input = process.argv.slice(2);
let cmd = input[0];

switch(cmd) {
    case "view":
        viewFn(input[1], input[2]);
        break;
    case "organize":
        organizeFn(input[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log(`Wrong command entered, enter help to see the list of all commands`);
        break;
}