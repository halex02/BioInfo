/*
 *Inclusion des librairies dans l'exécutable.
 *On a écrit 5 librairies (2 utilitaires : fastaParser.js et random.js; et une pour chaque partie du TP).
 */
const fasta = require('./lib/fasta.js') ; //partie 1
const kmers = require('./lib/kmers.js') ; //partie 2
const mutation = require('./lib/mutation.js') ; //partie 3

/*
 * Erreur renvoyée si le tableau argv ne contient pas un nombre suffisant de paramètre.
 * Exemple : argv = ['node', 'bioseq' 'print-fasta-sequences', './data/test1.fasta'] 
 * a la taille minimale requise pour les fonctions du programme.
 */
const errorLength = new Error('Erreur : Paramètre(s) insufisant(s).\n') ;

/*
 * Erreur générique pour le switch renvoyé si le cas default est atteint.
 */
const errorUnknownCommand = new Error('Erreur : commande inconnue.\n') ;

/*
 * On récupère le tableau argv auprès de l'instance globale de la classe Process...
 */
var argv = process.argv ;

/*
 * ... et on vérifie qu'il contient bien au moins 4 éléments.
 */
if (argv.length < 4)
    console.log(errorLength.message) ;

switch(argv[2]){
case 'print-fasta-sequences' :
    fasta.printFastaSequences(argv[3]); //cf. fasta.js
    break ;
    
case 'print-fasta-stats' :
    fasta.printFastaStats(argv[3]); //cf. fasta.js
    break ;

case 'list-kmers' :
    kmers.printListKmers(argv[3], argv[4]) ; //cf kmers.js
    break ;

case 'common-kmers' :
    kmers.printCommonKmers(argv[3], argv[4], argv[5]) ; //cf. kmers.js
    break ;

case 'ratio-common-kmers' :
    kmers.printCommonKmersRatio(argv[3], argv[4], argv[5]) ; //cf. kmers.js
    break ;
    
case 'random-mutations' :
    mutation.randomMutations(argv[3], argv[4]) ; //cf. mutation.js
    break ;

default:
    console.log(errorUnknownCommand.message) ; //si l'utilisateur s'amuse à écrire n'importe quoi en paramètre, le programme plante.
}
