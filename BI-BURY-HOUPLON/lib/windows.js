const parser = require('./fastaParser.js') ;

var windows = function (longueur, shift, path) {
	var json_sequences =  parser.fastaFileToJsonObject(path) ;
    var windowsArray = [] ;
    
    var aux = function (seq, i, arr, pas) {
	var index_debut = 0 ;
	var index_fin = i ;
	
	while(index_fin <= seq.length){
		    arr.push(seq.slice(index_debut, index_fin)) ;
		    index_debut += pas;
		    index_fin += pas;
		}
    } ;

    for(var i = 0 ; i < json_sequences.sequences.length ; i++)
		aux(json_sequences.sequences[i].sequence, longueur, windowsArray, shift);
    return windowsArray ;
} 

exports.printWindows = function (longueur, shift, path) {
	var fenêtres = windows (longueur, shift, path);
	for each (window in fenêtres){
		console.log(window + '\n');
	}
}