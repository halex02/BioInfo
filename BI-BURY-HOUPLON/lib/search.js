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
	calcule le tableau de suffixes du génome g
	un tableau d'entier de chaque position du génome ordoné dans l'ordre lexicographique.
*/
var=suffixArray = function(g){
/*
	
*/

}

/*
	print le retour de suffixArray en lui donnant le génome trouvé dans path
*/
exports.printSuffixArray = function(path) {
	// body...
}