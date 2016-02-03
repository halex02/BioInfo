const fs = require('fs');

/*
 * continueWritingAtPosition(string, path, position) : écrit le string dans le fichier path à la position indiqué, retourne la nouvelle position.
 */
exports.continueWritingAtPosition = function (string, path, position) {
    var pos = position;
    var fd = fs.openSync(path, 'r+');
    pos = pos + fs.writeSync(fd,string,position,'ascii');
    return pos;
}

/*
 * createVoidFile(path) : créer un fichier vide à path pour commencer un fichier à la position 0
 */
 exports.createVoidFile = function (path) {
 	fs.mkdirSync(path,'0666')
 }