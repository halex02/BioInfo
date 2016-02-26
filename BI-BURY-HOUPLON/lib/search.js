const parser = require('./fastaParser.js') ;

/*
 * recherche naive : prend une séquence de nucléotide, une lecture et cherche les occurences
 * de cette dernière dans la séquence. renvoie un tableau contenant les indices ou un tableau vide.
 */
exports.naive_search = function(seq read) {
  var limit = seq.length-read.length ; // limite à ne pas dépasser dans les indices de la chaine pour éviter les débordements
  var res = [] ;
	for (var i = 0 ; i < limit ; i++) {
    /*
     * si la sous-chaine de seq débutant à l'indice i et de même longueur que read est identique à read, alors on renvoie i.
     */
    if (seq.substr(i, read.length)==read)
      res.push(i) ;//ajoute le nouvel indice trouvé à la fin du tableau.
    
    return res ;
  }
}

/*
	calcule le tableau de suffixes du génome g sous forme de string.
	un tableau d'entier de chaque position du génome ordoné dans l'ordre lexicographique.
*/
var suffixArray = function(g){
/*
	créer un tableauSuf de String
	créer un tableauID d'Int
	pour chaque char de g
		créer un string allant du début au char séléctionné
		le rentre avec l'emplacement du char comme id dans la map
	trier par ordre ortographique la map.
	retourner le tableauID
*/
	var tableauSuf = [];
	var tableauID = [];
	for (var i = 0; i < g.length; i++) {
		tableauSuf[i] = g.substring(i);
		tableauID[i] = i;
	}
	return compare(tableauSuf, tableauID);
}

var tri = function (tab) {
  for(
}

/*
	print le retour de suffixArray en lui donnant le génome trouvé dans path
*/
exports.printSuffixArray = function(path) {
  var seq = parser.fastaFileToJsonObject(path).sequences ;// un tableau de sequences de nucléotides
  
  for (var i = 0 ; i < seq.length ; i++) {
    var suffix = suffixArray(seq[i].sequence) ;
    var str = suffix[0] ;//création d'une chaine pour l'impression initialisé avec suffix[0]    
    for (var j = 1 ; j < suffix.length ; j++){
     str+= ' '+suffix[i] ;//on boucle en séparant par un espace chaque entier
    }
    console.log(str) ;// on imprime la chaine contenant les indexes.
  }	
}

