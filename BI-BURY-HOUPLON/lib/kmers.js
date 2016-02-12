const parser = require('./fastaParser.js') ;
const seed = require('./graine.js') ;
const array = require('./array.js') ;

//      /!\ devra traduire les séquence en majuscule, possibilité que des minuscule tombe aléatoirement dans certaine séquence.  /!\

/*
 * sequenceToKmers(seq, regex, n) : prend une séquence de nucléotides, une regex pour la filtrer, la "taille" de la regex (que l'on peut obtenir,
 * comme la regex, à partir de la graine (il suffit de supprimer tous les '-' de la seed et de récupérer la longueur
 * de cette chaine), pour renvoyer un tableau de kmers.
 */
exports.sequenceToKmers = function(seq, regex, n) {
    var res = new Array(n) ;
    var j = 0 ;
    while (regex.lastIndex <= seq.length-n) {
    	var traitement = regex.exec(seq) ;
    	res[j]='';
    	for (var i = 1 ; i <= n ; i++) {
    	    res[j]+=traitement[i] ;
	    }
    	regex.lastIndex = traitement.index+1 ;
    	j++ ;
    }
    return res ;
}

/*
 * arrayOfKmersBySeed(s, json) : génére un tableau de kmers à partir d'une graine et d'un objet JSON contenant des séquences de nucléotides.
 */
exports.arrayOfKmersBySeed = function(s, json) {
    var json_sequences =  json.sequences.map(function(json){return json.sequence ;}) ; //génération d'un tableau de string à partir de l'objet json

    /*
     * on mappe le tableau de séquences avec une fonction renvoyant un tableau de tableaux de kmers. 
     */
    var kmers_matrix = json_sequences.map(function(seq){return exports.sequenceToKmers(seq,
										       seed.seedToRegex(s, seed.translate),//création de la regex
										       s.replace(/-/g, '').length)}) ;//détermination de la longueur des kmers

    /*
     * on renvoie le tableau précédent après avoir fusionné tous les sous-tableaux pour ne plus avoir qu'un tableau de kmers.
     */
    return array.matrixToArray(kmers_matrix) ;
}

/*
 * arrayOfKmersByLength(l, json) : renvoie un tableau de kmers à partir d'une longueur donné pour ceux-ci et d'un objet JSON.
 */
exports.arrayOfKmersByLength = function (l, json) {
    return exports.arrayOfKmersBySeed('#'.repeat(l), json) ;
}

/*
 * commonKmersArray(kmers1, kmers2) : fonction qui prend deux tableaux de kmers et renvoie le tableau des kmers communs aux deux tableaux passés
 * en paramètre.
 * CU : ne pas éliminer les doublons dans les tableaux passés en paramètres, la fonction le fait elle-même.
 */
exports.commonKmersArray = function (kmers1, kmers2) {
    var common = [] ;
    
    for (var i = 0 ; i < kmers1.length ; i++)
	if (common.indexOf(kmers1[i])==(-1) && kmers2.indexOf(kmers1[i])!=(-1))
	    common.push(kmers1[i]) ;
    return common ;
}

/*
 * commonKmersRation(kmers1, kmers2) : prend 2 tableaux de kmers et renvoie le ratio des kmers du premier tableau qui sont également dans le second.
 */
exports.commonKmersRatio = function (kmers1, kmers2) {
    var common = exports.commonKmersArray(kmers1, kmers2) ;

    return (common.length)/(kmers2.length) ;
}

/*
 * printListKmers(kmers) : imprime le contenu du tableau de kmers passé en paramètre, à raison d'un kmers par ligne.
 */
exports.printListKmers = function(kmers) {
    for (var i = 0 ; i < kmers.length ; i++){
	    console.log(kmers[i]) ;
        console.log('\n') ;
    }
}

/*
 * printCommonKmersRatio(kmers1, kmers2) : imprime le ratio des kmers du premier tableau qui sont également dans le second. 
 */
exports.printCommonKmersRatio = function (kmers1, kmers2) {
    console.log(exports.commonKmersRatio(kmers1, kmers2)+'\n') ;
}

