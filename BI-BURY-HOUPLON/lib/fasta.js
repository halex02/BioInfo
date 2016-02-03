const parser = require('./fastaParser.js') ;

exports.printFastaSequences = function (path) {
    var json_sequences =  parser.fastaFileToJsonObject(path) ;
    for (var i = 0 ; i < json_sequences.sequences.length; i++) {
	console.log(json_sequences.sequences[i].sequence+'\n') ;
    }
}

exports.printFastaStats = function (path) {
    var json_sequences =  parser.fastaFileToJsonObject(path) ;
    for (var i = 0 ; i < json_sequences.sequences.length; i++) {
	console.log(json_sequences.sequences[i].id+' '+json_sequences.sequences[i].sequence.length+'\n') ;
    }
}
