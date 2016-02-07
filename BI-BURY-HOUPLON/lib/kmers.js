const parser = require('./fastaParser.js') ;
const seed = require('./graine.js') ;
const array = require('./array.js') ;

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


exports.commonKmersArray = function (l, json1, json2) {
    var kmers1 = exports.arrayOfKmersByLength(l, json1) ;
    var kmers2 = exports.arrayOfKmersByLength(l, json2) ;
    var common = [] ;
    
    for (var i = 0 ; i < kmers1.length ; i++)
	if (common.indexOf(kmers1[i])==(-1) && kmers2.indexOf(kmers1[i])!=(-1))
	    common.push(kmers1[i]) ;
    return common ;
}

exports.commonKmersRatio = function (l, json1, json2) {
    var kmers2 = exports.arrayOfKmersByLength(l, json2) ;
    var common = exports.commonKmersArray(l, json1, json2) ;

    return (common.length)/(kmers2.length) ;
}


exports.printListKmers = function(l, json) {
    var kmers = exports.arrayOfKmersByLength(l, json) ;
    
    for (var i = 0 ; i < kmers.length ; i++)
	console.log(kmers[i]) ;
    console.log('\n') ;
}

exports.printCommonKmers = function (l, json1, json2) {
    var common = exports.commonKmersArray(l, json1, json2) ;

    for(var i = 0 ; i < common.length ; i++)
	console.log(common[i]) ;
    console.log('\n') ;
}

exports.printCommonKmersRatio = function (l, json1, json2) {
    console.log(exports.commonKmersRatio(l, json1, json2)+'\n') ;
}

