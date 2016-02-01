const parser = require('./fastaParser.js') ;

var arrayOfKmers = function (l, path) {
    var json_sequences =  parser.fastaFileToJsonObject(path) ;
    var kmers_array = [] ;
    
    var aux = function (seq, i, arr) {
	var index_debut = 0 ;
	var index_fin = i ;
	
	while(index_fin <= seq.length)
	    arr.push(seq.slice(index_debut++, index_fin++)) ;
    } ;

    for(var i = 0 ; i < json_sequences.sequences.length ; i++)
	aux(json_sequences.sequences[i].sequence, l, kmers_array);
    return kmers_array ;
}

var commonKmersArray = function (l, path1, path2) {
    var kmers1 = arrayOfKmers(l, path1) ;
    var kmers2 = arrayOfKmers(l, path2) ;
    var common = [] ;
    
    for (var i = 0 ; i < kmers1.length ; i++)
	if (common.indexOf(kmers1[i])==(-1) && kmers2.indexOf(kmers1[i])!=(-1))
	    common.push(kmers1[i]) ;
    return common ;
}

var commonKmersRatio = function (l, path1, path2) {
    var kmers2 = arrayOfKmers(l, path2) ;
    var common = commonKmersArray(l, path1, path2) ;

    return (common.length)/(kmers2.length) ;
}


exports.printListKmers = function(l, path) {
    var kmers = arrayOfKmers(l, path) ;

    for (var i = 0 ; i < kmers.length ; i++)
	console.log(kmers[i]) ;
}

exports.printCommonKmers = function (l, path1, path2) {
    var common = commonKmersArray(l, path1, path2) ;

    for(var i = 0 ; i < common.length ; i++)
	console.log(common[i]) ;
}

exports.printCommonKmersRatio = function (l, path1, path2) {
    console.log(commonKmersRatio(l, path1, path2)) ;
}
