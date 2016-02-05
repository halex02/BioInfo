const parser = require('./fastaParser.js') ;
const kmerer = require('./kmer.js');

/*
 * adaptation de arrayOfKmers pour fonctionner avec un string au lieu d'un path et la gestion d'un pas suppérieur à 1.
 */
var arrayOfKmersWithAWindow = function (l, sequence, shift = 1) {
    var kmers_array = [] ;
    
    var aux = function (seq, i, arr) {
		var index_debut = 0 ;
		var index_fin = i ;
		
		while(index_fin <= seq.length){
		    arr.push(seq.slice(index_debut, index_fin))
		    index_debut += shift;
		    index_fin += shift;
			};
    };
	aux(sequence, l, kmers_array);
    return kmers_array ;
}

/*
 * adaptation de commonKmersArray pour fonctionner avec des string au lieu des paths.
 */
var commonKmersArrayWithAWindow = function (l, fenetre, sequence) {
    var kmers1 = arrayOfKmersWithAWindow(l, fenetre) ;
    var kmers2 = arrayOfKmersWithAWindow(l, sequence) ;
    var common = [] ;
    
    for (var i = 0 ; i < kmers1.length ; i++)
	if (common.indexOf(kmers1[i])==(-1) && kmers2.indexOf(kmers1[i])!=(-1))
	    common.push(kmers1[i]) ;
    return common ;
}

/*
 * adaptation de commonkmersRation pour fonctionner avec des strings à la place des paths.
 */
var commonkmersRatioWithAWindow = function (l, fenetre, sequence){
	var kmers2 = arrayOfKmersWithAWindow(l, sequence) ;
    var common = commonKmersArrayWithAWindow(l, fenetre, sequence) ;

    return (common.length)/(kmers2.length) ;
}

/*
 * affiche sur la sortie standart le résultat de la fonction window avec les coordonnés.
 */
exports.printWindows = function (longueur, shift, path) {
	var fenetres = arrayOfKmersWithAWindow (longueur, parser.fastaFileToJsonObject(path), shift);
	var tete = 1;
	var queux = longueur;
	for each (fenetre in fenetres){
		console.log(tete + ' ' + fenetre + ' ' + queux + '\n');
		tete +=shift;
		queux +=shift;
	}
}

/*
 * cherche les fenetres d'un génome 'pathGenome' les plus ressemblante avec 'pathread'.
 * Elle retournera les fenêtres, avec leur coordonné , ayant un ratio de 'seuilKmer' kmers en commun.
 */
exports.mapperWindowsKmers = function (longueurWindow,shiftWindow,longueurKmer,seuilKmer,pathRead,pathGenome){
	var fenetres = arrayOfKmersWithAWindow (longueurWindow,parser.fastaFileToJsonObject(pathGenome),shiftWindow);
	var ratio = 0.0;
	var tete = 1;
	var queux = longueur;
	for each (fenetre in fenetres){
		ratio = commonkmersRatioWithAWindow(longueurKmer,fenetre, pathread);
		if (seuilKmer <= ratio) {
			console.log(tete + ' ' + fenetre + ' ' + queux + '\n');
		};
		tete +=shiftWindow;
		queux +=shiftWindow;
	}
}