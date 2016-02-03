const parser = require('./fastaParser.js') ;
const random = require('./random.js') ;

var randomMutation= function (i, path) {
    var json_sequence =  parser.fastaFileToJsonObject(path) ;
    
    var muteUneFois = function (seq, func) {
	var i = random.randomInt(0, seq.length-1) ;
	
	var res = seq.substring(0, i)+func(seq[i], 'ACTG')+seq.substring(i+1, seq.length) ;
	
	return res ;
    } ;

    var muteNFois = function (seq, i) {
	if(i == 1)
	    return muteUneFois(seq, function(nucl, pattern){return pattern.replace(nucl, '')[random.randomInt(0, 2)];}) ;
	else
	    return muteNFois(muteUneFois(seq, function(nucl, pattern){return pattern.replace(nucl, '')[random.randomInt(0, 2)];}), i-1) ;
    } ;

    var mutated_sequence = muteNFois(json_sequence.sequences[0].sequence, i) ;
    
    var json_res = {sequences : [{id: json_sequence.sequences[0].id+'-mutated',
				  sequence: mutated_sequence}]} ;
   
    return json_res ;
}

exports.printMutation = function (i, path) {
    var json_mutated = randomMutation (i, path) ;

    console.log('>'+json_mutated.sequences[0].id) ;
    console.log(json_mutated.sequences[0].sequence+'\n') ;
}
