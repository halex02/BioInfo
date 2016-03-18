/*
 *Inclusion des librairies dans l'exécutable.
 *On a écrit 5 librairies (2 utilitaires : fastaParser.js et random.js; et une pour chaque partie du TP).
 */
const fasta = require('./lib/fasta.js') ; //partie 1
const kmers = require('./lib/kmers.js') ; //partie 2
const mutation = require('./lib/mutation.js') ; //partie 3
const windows = require('./lib/windows.js') ;
const parser = require('./lib/fastaParser.js') ;
const matcheur = require('./lib/matcheur.js');
const seed = require('./lib/graine.js');
const looker = require('./lib/search2.js');

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
        kmers.printListKmers(kmers.arrayOfKmersByLength(argv[3],
    						    parser.fastaFileToJsonObject(argv[4]))) ; //cf kmers.js
        break ;

    case 'list-spaced-kmers' :
        kmers.printListKmers(kmers.arrayOfKmersBySeed(argv[3],
    						    parser.fastaFileToJsonObject(argv[4]))) ;
        break ;
        
    case 'common-kmers' :
        kmers.printListKmers(kmers.commonKmersArray(kmers.arrayOfKmersByLength(argv[3],
    									   parser.fastaFileToJsonObject(argv[4])),
    						kmers.arrayOfKmersByLength(argv[3],
    									   parser.fastaFileToJsonObject(argv[5])))) ;
        break ;

    case 'bwt' : 
        var tampon = -1;
        if (argv[4] != null) {
            tampon = argv[4]
        }
        looker.printBwt(argv[3], tampon);
        break;

    case 'common-spaced-kmers' :
        kmers.printListKmers(kmers.commonKmersArray(kmers.arrayOfKmersBySeed(argv[3],
    									 parser.fastaFileToJsonObject(argv[4])),
    						kmers.arrayOfKmersBySeed(argv[3],
    									 parser.fastaFileToJsonObject(argv[5])))) ;
        break ; 
        
    case 'ratio-common-kmers' :
        kmers.printCommonKmersRatio(kmers.arrayOfKmersByLength(argv[3],
    							   parser.fastaFileToJsonObject(argv[4])),
    				kmers.arrayOfKmersByLength(argv[3],
    							   parser.fastaFileToJsonObject(argv[5]))) ; //cf. kmers.js
        break ;

    case 'ratio-common-spaced-kmers' :
        kmers.printCommonKmersRatio(kmers.arrayOfKmersBySeed(argv[3],
                                                            parser.fastaFileToJsonObject(argv[4])),
                                    kmers.arrayOfKmersBySeed(argv[3],
                                    parser.fastaFileToJsonObject(argv[5]))) ; //cf. kmers.js
        break ;

    case 'suffix-array' :
        looker.printSuffixArray(argv[3]);
        break;

    case 'best-matches':
        var tampon = argv[4];// comparaison pour accepter autant les type numéraire que les seed espacé en entré.
        if (seed.is_int(tampon)) {
            tampon = seed.numToSeed(tampon);
        }
        matcheur.printBestMatcheur(argv[3],tampon,argv[5],argv[6]);
        break;

    case 'VJ-discover':
        var tampon = argv[3];// comparaison pour accepter autant les type numéraire que les seed espacé en entré.
        if (seed.is_int(tampon)) {
            tampon = seed.numToSeed(tampon);
        }
        matcheur.printDiscover(tampon,argv[4],argv[5],argv[6]);
        break;

    case 'mapper-windows-spaced-kmer' :
        windows.mapperWindowsSpacedKmers(argv[3],argv[4],argv[5],argv[6],argv[7],argv[8]);
        break;

    case 'random-mutations' :
        mutation.printMutation(argv[3], argv[4]) ; //cf. mutation.js
        break ;

    case 'windows' :
        windows.printWindows(argv[3], argv[4], argv[5]) ;
        break ;

    case 'mapper-windows-kmer' :
        windows.mapperWindowsKmers(argv[3],argv[4],argv[5],argv[6],argv[7],argv[8]) ;
        break ;
        
    default:
        console.log(errorUnknownCommand.message) ; //si l'utilisateur s'amuse à écrire n'importe quoi en paramètre, le programme plante.
}
