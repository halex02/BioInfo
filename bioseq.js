
const errorLength = new Error(" bioseq.js : Nombre de paramètres insuffisants !\n") ;

var argv = process.argv ;

if (argv.length < 3)
    console.log(errorLength.message) ;

switch(argv[2]){
case "print-fasta-sequences" :
    print-fasta-sequences(argv[3]);
    break ;
    
case "print-fasta-stats" :
    print-fasta-stats(argv[3]);
    break ;
    
case "random-mutations" :
    random-mutations(argv[3], argv[4]) ;
    break ;

default:
    console.log("Rompshit !") ;
}
