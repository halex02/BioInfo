const mutation = require('./lib/mutation.js') ;
const parser = require('./lib/fastaParser.js') ;

mutation.printMutation(parseInt(process.argv[2]),
		       parser.fastaFileToJsonObject('./data/ebola-z.fasta')) ;
