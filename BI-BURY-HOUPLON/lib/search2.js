const parser = require('./fastaParser.js') ;


function invertBwt(argument) {
	// body...
}

function bwter(argument) {
	// body...
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
	var retour=[];
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
	print la bwt des génome trouvé dans path.
*/
exports.printBwt = function(path){
	var seqs = parser.fastaFileToJsonObject(path).sequences;
	for (var i = 0; i < seqs.length; i++) {
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