const fs = require('fs');

exports.fastaStringToJsonString = function (str) {
    var del_index = str.indexOf('\n') ;
    var fasta_id = str.substring(0, del_index) ;
    var fasta_sequence = str.substr(del_index+1).replace(/\n/g,'') ;
    var json_string = '{"id": "'+fasta_id+'",\n"sequence": "'+fasta_sequence+'"}' ;
    return json_string ;
}


//à partir du path d'un fichier.fasta, le traduit en JSON, sous la forme d'un String, séparant chaque séquence.
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

//à partir du path d'un fichier.fasta, le traduit en JSON séparant chaque séquence.
exports.fastaFileToJsonObject = function (path){
    return JSON.parse(exports.fastaFileToJsonString(path)) ;
}

//à partir du path1 d'un fichier.fasta, crée un fichier.json au path2 séparant chaque séquence.
exports.fastaFileToJsonFile = function(path1, path2){
    var json_string = exports.fastaFileToJsonString(path1) ;
    fs.writeFile(path2, json_string, function(err){
	if (err)
	    throw err ;
	console.log('Fichier JSON sauvegardé.\n') ;
    }) ;
}

//à partir du path d'un fichier.json, retourne l'objet JSON.
exports.jsonFileToJsonObject = function (path) {
    var json_string = fs.readFileSync(path, 'ascii') ;
    return JSON.parse(json_string) ;
}

exports.jsonObjectToFastaFile = function(json, path) {
    var res = '' ;
    
    var aux = function(json){
	var id = '>'+json.id+'\n' ;
	var seq =json.seq ;
	return id+seq ;
    }

    for (var i = 0 ; i < json.sequences.length ; i++)
	res+= aux(json.sequences[i])+'\n' ;
    return res ;
    
}
