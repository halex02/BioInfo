const parser = require('./fastaParser.js') ;
const kmerer = require('./kmers.js');
const seedObj = require('./graine.js') ;

/*
donne une suite de bout de sequence de longueur l, un kmer ou une fenètre
 * adaptation de arrayOfKmers pour fonctionner avec un string au lieu d'un path et la gestion d'un pas suppérieur à 1.
 */
var arrayOfKmersWithAWindow = function (l, sequence, shift) {
	var shift = typeof shift !== 'undefined' ? b : 1;
    var kmers_array = [] ;

	var index_debut = 0 ;
	var index_fin = l ;
	
	while(index_fin <= sequence.length){
	    kmers_array.push(sequence.slice(index_debut, index_fin));//prend toute la longueur et la push dans le tableau
	    index_debut += shift;//avance dans la sequence
	    index_fin += shift;
	};

    return kmers_array ;
}

/*
 * adaptation de commonKmersArray pour fonctionner avec des string au lieu des paths. donne 
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
 * adaptation de commonkmersRation pour fonctionner avec des strings à la place des paths. donne le ratio de kmer de longueur l commun entre la séquence et la fenetre
 */
var commonkmersRatioWithAWindow = function (l, fenetre, sequence){
	var kmers2 = arrayOfKmersWithAWindow(l, sequence) ;
    var common = commonKmersArrayWithAWindow(l, fenetre, sequence) ;

    return (common.length)/(kmers2.length) ;
}
/*--------------------------------------------------------------
//donne un tableau de kmer à partir d'une graine et d'une séquence*/
var arrayOfSpacedKmersWithAWindow = function (seed, sequence) {
	var kmers_array = kmerer.sequenceToKmers(sequence, 
    					   seedObj.seedToRegex(seed, seedObj.translate),
						   seed.replace(/-/g, '').length);


    return kmers_array ;
}

//donne un tableau des kmer seedé commun entre la séquence et la fenetre
var commonSpacedKmersArrayWithAWindow = function (seed, fenetre, sequence) {
    var kmers1 = arrayOfSpacedKmersWithAWindow(seed, fenetre) ;
    var kmers2 = arrayOfSpacedKmersWithAWindow(seed, sequence) ;
    var common = [] ;
    
    for (var i = 0 ; i < kmers1.length ; i++)
	if (common.indexOf(kmers1[i])==(-1) && kmers2.indexOf(kmers1[i])!=(-1))
	    common.push(kmers1[i]) ;
    return common ;
}

//donne le ratio de kmer seedé de longueur l commun entre la séquence et la fenetre
var commonSpacedkmersRatioWithAWindow = function (seed, fenetre, sequence){
	var kmers2 = arrayOfSpacedKmersWithAWindow(seed, sequence) ;
    var common = commonSpacedKmersArrayWithAWindow(seed, fenetre, sequence) ;

    return (common.length)/(kmers2.length) ;
}
//--------------------------

/*
 * affiche sur la sortie standart le résultat de la fonction window avec les coordonnés.
 */
exports.printWindows = function (longueur, shift, path) {
	var fenetres = arrayOfKmersWithAWindow (longueur, parser.fastaFileToJsonObject(path), shift);
	var tete = 1;
	var queux = longueur;
	for (fenetre in fenetres){
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
	for (fenetre in fenetres){
		ratio = commonkmersRatioWithAWindow(longueurKmer,fenetre, pathread);
		if (seuilKmer <= ratio) {
			console.log(tete + ' ' + fenetre + ' ' + queux + '\n');
		};
		tete +=shiftWindow;
		queux +=shiftWindow;
	}
}

exports.mapperWindowsSpacedKmers = function (longueurWindow,shiftWindow,graine,seuilKmer,pathRead,pathGenome){
	var fenetres = arrayOfKmersWithAWindow (longueurWindow,parser.fastaFileToJsonObject(pathGenome),shiftWindow);
	var ratio = 0.0;
	var tete = 1;
	var queux = longueur;
	for (fenetre in fenetres){
		ratio = commonSpacedkmersRatioWithAWindow(graine,fenetre, pathread);
		if (seuilKmer <= ratio) {
			console.log(tete + ' ' + fenetre + ' ' + queux + '\n');
		};
		tete +=shiftWindow;
		queux +=shiftWindow;
	}
}




















