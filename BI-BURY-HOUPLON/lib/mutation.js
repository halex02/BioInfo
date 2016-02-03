const parser = require('./fastaParser.js') ;
const random = require('./random.js') ;

exports.randomMutation(i, path) {
    var json_sequences =  parser.fastaFileToJsonObject(path) ;
        
    var aux = function (seq, func) {
	var i = random.randomInt(0, seq.length-1) ;
	return seq.substring(0, i)+func(seq[i], 'ACTG')+substring(i+1, seq.length-1) ;
    } ;

    var mutated_sequence = aux(json_sequences.sequences[0].sequence, (nucl, pattern)=> {return pattern.replace(nucl, '')[random.randomInt(0, 2)];})
    
}
