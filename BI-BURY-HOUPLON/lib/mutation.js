const parser = require('./fastaParser.js') ;
const random = require('./random.js') ;

exports.randomMutation(i, path) {
    var json_sequence =  parser.fastaFileToJsonObject(path) ;
        
    var aux = function (seq, func) {
	var i = random.randomInt(0, seq.length-1) ;
	return seq.substring(0, i)+func(seq[i], 'ACTG')+substring(i+1, seq.length-1) ;
    } ;

    var aux2 = function (seq, i) {
	if(i == 1)
	    return aux(seq, (nucl, pattern)=> {return pattern.replace(nucl, '')[random.randomInt(0, 2)];}) ;
	else
	    return aux2(aux(seq, (nucl, pattern)=> {return pattern.replace(nucl, '')[random.randomInt(0, 2)];}), i-1) ;
    } ;

    var mutated_sequence = aux2(json_sequence.sequences[0].sequence, i) ;

    return JSON.parse('{"sequences" : [{"id": "'+json_sequence.sequences[0].id+'-mutated",\n"sequence": "'+mutated_sequence+'"}]') ;
}

