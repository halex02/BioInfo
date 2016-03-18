const parser = require('./fastaParser.js') ;

/*
 * recherche naive : prend une séquence de nucléotide, une lecture et cherche les occurences
 * de cette dernière dans la séquence. renvoie un tableau contenant les indices ou un tableau vide.
 */
exports.naive_search = function(seq, read) {
	var limit = seq.length-read.length ; // limite à ne pas dépasser dans les indices de la chaine pour éviter les débordements
	var res = [] ;
	for (var i = 0 ; i < limit ; i++) {
    if (seq.substr(i, read.length)==read)//si la sous-chaine de seq débutant à l'indice i et de même longueur que read est identique à read, alors on renvoie i.
      res.push(i) ;//ajoute le nouvel indice trouvé à la fin du tableau.
    return res ;
	}
}

/*
	calcule le tableau de suffixes du génome g sous forme de string.
	retourne un tableau de couple d'entier et string
	le string "suff" est le suffixe et l'entier "id" est la postion d'origine du suffixe dans le génome fournit.
*/
var suffixArray = function(g){
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
	à partir du génome g renvois un tableau de rotation ordonné.
*/
var rotater = function (g){
	/*
		rajoute $
		créer un tableau de couple int string
		pour chaque char de g
			créer un string allant du char séléctionné à la fin du g plus le début de g jusqu'au char séléctionné
			le rentre avec l'emplacement du char comme id dans la map
		trier par ordre ortographique la map.
		retourner le tableauID
	*/
	var table=[];
	for (var i = 0; i < g.length; i++) {
		table[i] = {"id": i, "suff":g.substring(i)+g.substring(0,i-1)};
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
	construit la BWT du génome g.
*/
var bwter = function(g){
	var table = rotater(g + '$');
	var str = '';
	for (var i = 0;i<table.length;i++){
		str+=table[i].suff[table[i].suff.length-1];
	}
	return str;
}

/*
	inverse la BWT pour donner le string l'ayant normalement généré. $ en moins
*/
var invertBwt = function (bwt) {
	/*
		créer un tableau de string intialisé avec chaque char de bwt.
		trier le tableau
		ajouter à nouveau chaque char de bwt devant.
		for i->taille de bwt


	*/

	var table = bwt.split('');
	table.sort();
	for (var i = table.length - 1; i >= 0; i--) {
		table[i] = bwt[i]+table[i];
	}
	var taille = bwt.length;
	for (var i = 2; i< taille;i++){
		//trier
		table.sort();
		//ajouter bwt
		for (var j = 0; j < taille; j++) {
			table[j][i] = bwt[j] + table[j][i];
		}
	}

	return table[0].reverse().pop();//revert la table[0] puis retire le dernier élément (normalement le $)
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


