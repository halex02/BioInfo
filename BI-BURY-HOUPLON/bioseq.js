const fasta = require('./lib/fasta.js') ;
const kmers = require('./lib/kmers.js') ;
//const mutation = require('./lib/mutation.js') ;

const errorLength = new Error('Erreur : Paramètre(s) insufisant(s).\n') ;
const errorUnknownCommand = new Error('Erreur : commande inconnue.\n') ;

var argv = process.argv ;

if (argv.length < 3)
    console.log(errorLength.message) ;

switch(argv[2]){
case 'print-fasta-sequences' :
    fasta.printFastaSequences(argv[3]);
    break ;
    
case 'print-fasta-stats' :
    fasta.printFastaStats(argv[3]);
    break ;

case 'list-kmers' :
    kmers.printListKmers(argv[3], argv[4]) ;
    break ;

case 'common-kmers' :
    kmers.printCommonKmers(argv[3], argv[4], argv[5]) ;
    break ;

case 'ratio-common-kmers' :
    kmers.printCommonKmersRatio(argv[3], argv[4], argv[5]) ;
    break ;
    
// case 'random-mutations' :
//     mutation.randomMutations(argv[3], argv[4]) ;
//     break ;

default:
    console.log(errorUnknownCommand.message) ;
}
