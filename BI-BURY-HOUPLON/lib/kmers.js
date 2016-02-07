const parser = require('./fastaParser.js') ;
const graine = require('./graine.js') ;
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

exports.arrayOfKmersBySeed = function(s, json) {
    var json_sequences =  json.sequences.map(function(json){return json.sequence ;}) ;
    var kmers_matrix = json_sequences.map(function(seq){return exports.sequenceToKmers(seq,
										       graine.seedToRegex(s, graine.traduire),
										       s.replace(/-/g, '').length)}) ;
    return array.matrixToArray(kmers_matrix) ;
}

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

