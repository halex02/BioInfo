/*
 * Liste des caractères autorisées dans une graine.
 */
const motif = '#-' ;

/*
 * Erreur retourné en cas de graine non conforme.
 */
const errorPattern = new Error("caractère invalide dans la graine.\n") ;

//juste une fonction pour être absolument sur que la valeur est bien une valeur numérique.
exports.is_int=function (value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
}

/*
    transforme un numéro en une suite de # correspondant à un seed de longueur fixe.
*/
exports.numToSeed = function (num) {
    // body...
    var ret = "";
    for (var i = num - 1; i >= 0; i--) {
        ret += "#";
    }
    return ret;
}

/*
 * translate(c) : traduit le caractère 'c' d'une graine en chaine convertible en RegExp.
 */
exports.translate = function(c) {
    if ( motif.indexOf(c) == (-1)) {
	throw errorPattern ;
    }else if (motif.indexOf(c) == 0) {
	return '(.)' ; //Correspond à un nucléotide non filtré
    }else{
	return '.' ; //Correspond à un nucléotide filtré
    }
}

/*
 * seedToRegex(str, func) : convertit une graine en une RegExp 
 * qui permettra de filtrer une séquence de nucléotides.
 * par défaut func sera la fonction translate de graine.js
 */
exports.seedToRegex = function(str, func) {
    res = '' ;
    
    for (var i = 0 ; i < str.length ; i++) {
	   res+= func(str[i]) ;
    }
    return new RegExp(res, 'ig') ;
}

