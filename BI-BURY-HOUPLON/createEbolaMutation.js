const mutation = require('./lib/mutation.js') ;

var tab = [0, 10, 100, 1000, 10000] ;

for (var i = 0 ; i < tab.length ; i++)
    mutation.exportMutation(tab[i], './data/ebola-z.fasta', './data/ebola-mutant-'+tab[i]+'.fasta') ;
