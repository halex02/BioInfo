const fs = require('fs');

exports.fastaStringToJsonString = function (str) {
    var del_index = str.indexOf('\n') ;
    var fasta_id = str.substring(0, del_index) ;
    var fasta_sequence = str.substr(del_index+1).replace(/\n/g,'') ;
    var length_sequence = fasta_sequence.length ;
    var json_string = '{"id": "'+fasta_id+'",\n"sequence": "'+fasta_sequence+'",\n"length": '+length_sequence+'}' ;
    return json_string ;
}



exports.fastaFileToJsonString = function (path) {
    var sequences_string = fs.readFileSync(path, 'ascii') ; 
    var sequences_array = sequences_string.split('>') ;
    
    /* Comme on utilise le '>' comme délimiteur pour éclater la chaine
     * de caractère, on obtient une chaine vide dans la case d'index 0
     * qu'il faut donc éliminer avec un shift.
     */
    sequences_array.shift() ;

    var aux = function (arr, str) {
	if (arr.length == 1)
	    return '{"sequences": ['+str+exports.fastaStringToJsonString(arr.shift())+']}' ;
	else {
	    var str2 = str+exports.fastaStringToJsonString(arr.shift())+',\n' ;
	    return aux(arr, str2) ;
	}
    } ;
    
    return aux(sequences_array, '') ;
}

exports.fastaFileToJsonObject = function (path){
    return JSON.parse(exports.fastaFileToJsonString(path)) ;
}

exports.fastaFileToJsonFile = function(path1, path2){
    var json_string = exports.fastaFileToJsonString(path1) ;
    fs.writeFile(path2, json_string, (err) => {
	if (err)
	    throw err ;
	console.log('Fichier JSON sauvegardé.\n') ;
    }) ;
}

exports.jsonFileToJsonObject = function (path) {
    var json_string = fs.readFileSync(path, 'ascii') ;
    return JSON.parse(json_string) ;
}
