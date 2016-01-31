var jsoneur = require("lib/jsoneur.js")
function print-fasta-sequence (arg) {
	var path = arg;
	var Things = jsoneur.jsoneur(path);
	for (var i = Things.length - 1; i >= 0; i--) {
		console.log(Things.sequences[i].sequence + "\n");
	};
}