const parser = require('./fastaParser.js') ;
const random = require('./random.js') ;

/*
 * randomMutation(i, path) : récupère le contenu d'un fichier fasta et fait subir à la chaine de nucléotide
 * autant de mutations que passées en paramètre. Renvoie un objet JSON.
 * CU : le fichier ne doit contenir qu'une seule séquence.
 */
var randomMutation= function (i, json) {

    /*
     * fonction auxiliaire qui effectue une mutation sur la séquence donnée (string), prend également
     * une fonction en paramètre pour définir la nature de la mutation: celle-ci prend 2 paramètres dont une chaine contenant les 4
     * nucléotides.
     */
    var muteUneFois = function (seq, func) {
	var i = random.randomInt(0, seq.length-1) ;
	
	var res = seq.substring(0, i)+func(seq[i], 'ACTG')+seq.substring(i+1, seq.length) ;
	
	return res ;
    } ;

    /*
     * fonction auxiliaire qui applique 'i' fois la mutation définie par la fonction 'func' sur la séquence 'seq'.
     */
    var muteNFois = function (seq, func, i) {
        var ret = seq;
        for (var j = 0; j < i; j++) {
            ret = muteUneFois(ret,func);
        };
        return ret;
    }
    ;

	var mutated_sequence = muteNFois(json.sequences[0].sequence,
					 function(nucl, pattern){return pattern.replace(nucl, '')[random.randomInt(0, 2)];},
					 i) ;
    
    var json_res = {sequences : [{id: json.sequences[0].id+'-mutated',
				  sequence: mutated_sequence}]} ;
   
    return json_res ;
}

    /*
     * fonction qui imprime sur la console une séquence mutée.
     */
exports.printMutation = function (i, json) {
    var json_mutated = randomMutation (i, json) ;

    console.log('>'+json_mutated.sequences[0].id) ;
    console.log(json_mutated.sequences[0].sequence+'\n') ;
}
