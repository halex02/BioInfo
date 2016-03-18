const parser = require('./fastaParser.js') ;


function invertBwt(argument) {
	// body...
}

/*
	version opti de rotater
	ne retourne que les id
*/
var rotater = function (g){
	/*
		rajoute $
		créer un tableau d'int
		pour chaque char de g
			créer un string allant du char séléctionné à la fin du g plus le début de g jusqu'au char séléctionné
			le rentre avec l'emplacement du char comme id dans la map
		trier par ordre ortographique la map.
		retourner le tableauID
	*/
	var table=[];
	for (var i = 0; i < g.length; i++) {
		table[i] = i;
	}
	table.sort(function(a, b) {
		var gauche = g.substring(a)+g.substring(0,a-1);
		var droite = g.substring(b)+g.substring(0,b-1);
		if (gauche>droite){
			return 1;
		} else if(droite>gauche){
			return -1;
		} else {
			return 0;
		}
	});
	return table;
}

/*
	version ne faisant pas appel à une rotation complète du génome.

*/
function bwter(g) {
	var table = rotater(g + '$');
	var str = '';
	for (var i = 0;i<table.length;i++){
		if (table[i] <= 0) {
			str += g[g.length-1];
		} else{
			str += g[table[i]-1];	
		}
	}
	return str;
}

/*
	première version déjà optimisé reprise.
	calcule le tableau de suffixes du génome g sous forme de string.
	retourne un tableau de couple d'entier et string
	le string "suff" est le suffixe et l'entier "id" est la postion d'origine du suffixe dans le génome fournit.
*/
function suffixArray(argument) {
		/*
		créer un tableau de couple int string
		pour chaque char de g
			créer un string allant du char séléctionné à la fin du g
			le rentre avec l'emplacement du char comme id dans la map
		trier par ordre ortographique la map.
		retourner le tableauID
	*/
	var table=[];
	for (var i = 0; i < g.length; i++) {
		table[i] = {"id": i, "suff":g.substring(i)};
	}
	table.sort(function(a, b) {
		if (a.suff>b.suff){
			return 1;
		} else if(b.suff>a.suff){
			return -1;
		} else {
			return 0;
		}
	});
	return table;
}

/*
	print l'inversion de la bwt.
*/
exports.printInvertBwt = function(bwt){
	console.log(invertBwt(bwt.toUpperCase()));
}

/*
	print les num premier char de la bwt des génome trouvé dans path. si num vaux -1, sort toute la bwt.
*/
exports.printBwt = function(path, num){
	var seqs = parser.fastaFileToJsonObject(path).sequences;
	var lim = num;
	if (num == -1) {
		lim = seqs.length
	}
	for (var i = 0; i < lim; i++) {
		console.log(bwter(seqs[i].sequence.toUpperCase()));	
	}
}

/*
	print le retour de suffixArray en lui donnant le génome trouvé dans path
*/
exports.printSuffixArray = function(path) {
  var seq = parser.fastaFileToJsonObject(path).sequences ;// un tableau de sequences de nucléotides
  
  for (var i = 0 ; i < seq.length ; i++) {
    var suffix = suffixArray(seq[i].sequence.toUpperCase()) ;
    var str = suffix[0].id ;//création d'une chaine pour l'impression initialisé avec suffix[0]    
    for (var j = 1 ; j < suffix.length ; j++){
     str+= ' '+suffix[j].id ;//on boucle en séparant par un espace chaque entier
    }
    console.log(str) ;// on imprime la chaine contenant les indexes.
  }	
}