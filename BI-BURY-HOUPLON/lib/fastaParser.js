/*
 * Utilisation de l'api FileSystem de Node.js pour gérer les entrée/sorties.
 */
const fs = require('fs');

/*
 * fastaStringToJsonString(str) : prend une chaine de caractère, str, représentant une séquence de nucléotide au format fasta
 * et renvoie une chaine de caractère interprétable par l'objet JSON via sa méthode parse.
 */
exports.fastaStringToJsonString = function (str) {
    //on isole la première ligne représentant l'id de la séquence en trouvant le premier retour-chariot et en faisant un substring...
    var del_index = str.indexOf('\n') ;
    var fasta_id = str.substring(0, del_index) ;
    /*
     *... et on fait la même chose avec la chaine de nucléotide, et on en profite pour supprimmer tous les retour-chariot qu'elle contient
     *via une regex.
     */
    var fasta_sequence = str.substr(del_index+1).replace(/\n/g,'') ;
    //mise en forme de la chaine au format JSON pour la renvoyer ensuite.
    var json_string = '{"id": "'+fasta_id+'",\n"sequence": "'+fasta_sequence+'"}' ;
    return json_string ;
}

/*
 * fastaFileToJsonString(path) : prend le chemin d'un fichier fasta , le lit, le traduit en chaîne de caractères convertible en objet JSON.
 */
exports.fastaFileToJsonString = function (path) {
    //on récupère tout le contenu du fichier passé en paramètre, et on stocke chaque séquence dans une case d'un tableau.
    var sequences_string = fs.readFileSync(path, 'ascii') ;
    var sequences_array = sequences_string.split('>') ;
    
    /* Comme on utilise le '>' comme délimiteur pour éclater la chaine
     * de caractère, on obtient une chaine vide dans la case d'index 0
     * qu'il faut donc éliminer avec un shift.
     */
    sequences_array.shift() ;

    /*
     * fonction auxiliaire, récursive terminale, qui va parser chaque chaine du fichier fasta, stockée dans le tableau
     * passé en paramètre, utilisé comme une pile, et la stocker dans la chaine str qui sert d'accumulateur pour la fonction,
     * avant de la renvoyer après avoir dépilé et parser la dernière séquence d'adn.
     */
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

/*
 * fastaFileToJsonObject(path) : prend le chemin d'un fichier fasta et crée un objet JSON à partir de celui-ci.
 */
exports.fastaFileToJsonObject = function (path){
    return JSON.parse(exports.fastaFileToJsonString(path)) ;
}

/*
 * fastaFileToJsonFile(path1, path2) : convertit le fichier fasta d'adresse path1 en un fichier JSON d'adresse path2.
 * renvoie une erreur en cas de problème d'écriture, affiche une confirmation sur la console sinon.
*/
exports.fastaFileToJsonFile = function(path1, path2){
    var json_string = exports.fastaFileToJsonString(path1) ;
    fs.writeFile(path2, json_string, function(err){
	if (err)
	    throw err ;
	console.log('Fichier JSON sauvegardé.\n') ;
    }) ;
}

/*
 * jsonFileToJsonObject(path) : importe le fichier JSON d'adresse path dans un objet JSON.
 */
exports.jsonFileToJsonObject = function (path) {
    var json_string = fs.readFileSync(path, 'ascii') ;
    return JSON.parse(json_string) ;
}

/*
 * jsonObjectToFastaFile(json, path) : exporte un objet JSON en fichier fasta.
 */
exports.jsonObjectToFastaFile = function(json, path) {
    var res = '' ;

    /*
     * fonction auxiliaire qui reformate l'id de la séquence au format fasta
     * et le concatène à la chaîne de la séquence.
     */
    var aux = function(json){
	var id = '>'+json.id+'\n' ;
	var seq =json.seq ;
	return id+seq ;
    }

    for (var i = 0 ; i < json.sequences.length ; i++)
	res+= aux(json.sequences[i])+'\n' ;
    fs.writeFile(path, res) ;
    
}
