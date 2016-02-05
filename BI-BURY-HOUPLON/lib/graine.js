/*
 * Liste des caractères autorisées dans une graine.
 */
const motif = '#-' ;

/*
 * Erreur retourné en cas de graine non conforme.
 */
const erreurMotif = new Error("caractère invalide dans la graine.\n") ;

/*
 * traduire(c) : traduit le caractère 'c' d'une graine en chaine convertible en RegExp.
 */
exports.traduire = function(c) {
    if ( motif.indexOf(c) == (-1)) {
	throw erreurMotif ;
    }else if (motif.indexOf(c) == 0) {
	return '(.)' ; //Correspond à un nucléotide non filtré
    }else{
	return '.' ; //Correspond à un nucléotide filtré
    }
}

/*
 * seedToRegex(str, func) : convertit une graine en une RegExp 
 * qui permettra de filtrer une séquence de nucléotides.
 */
exports.seedToRegex = function(str, func) {
    res = '' ;
    
    for (var i = 0 ; i < str.length ; i++) {
	res+= func(str[i]) ;
    }
    return new RegExp(res, 'ig') ;
}

