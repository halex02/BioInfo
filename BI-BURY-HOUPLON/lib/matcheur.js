
const graine = require('./graine.js');
const kmerer = require('./kmers.js');
const fasta = require('./fastaParser');

/*
	renvoie un tableau contenant le ratio de ressemblance et le nombre de kmer commun entre deux séquence
*/
var matcheur = function (jsonA, jsonB, seed) {
	/*
		applique kmerer.arrayOfKmersBySeed pour obtenir les kmers de chaqu'une des deux séquence
		compare et obtien le ratio et le nombre de kmer commun
		retourne un tableau contenant séparément le ratio et le nombre de kmer commun.
	*/
	var tableA = kmerer.arrayOfKmersBySeed(seed,jsonA);
	var tableB = kmerer.arrayOfKmersBySeed(seed,jsonB);
	var retour[0] = kmerer.commonKmersRatio(tableA,tableB);
	var retour[1] = (retour[0].length)/(tableB.length);
	return retour;
}

/*
	retourne un tableau de tableau contenant les n séquences de pathGerm les plus ressemblante à pathRead à l'aide du seed, 
	pour chaque séquence trouvé dans pathRead.
	Le tableau donne les séquence par ordre de ressemblance suivit du nombre de kmer (désigné par le seed) commun.
	Le seed doit être une graine (##--##), les entrés numéraire doivent avoir était traduit avant.
*/
var bestMatcheurListeur = function (n, seed, pathRead, pathGerm) {
	/*
		récupérer un json de pathGerm
		compte les séquence dedans
		récupérer un json de pathRead
		établir un grand tableau de retour
		pour chaque séquence dans pathRead
			établir un tableau de retour
			pour chaque séquence de pathGerm
				appliqué matcheur entre la séquence de pathRead et celle de pathGerm
			trier dans l'ordre le tableau de retour
			inséré le tableau de retour dans le grand tableau de retour.
		retourner le grand tableau de retour.
	*/

}


/*
	écrit à l'écran les n séquence de pathGerm ressemblant le plus à pathRead à l'aide du seed. 
	L'affichage doit se faire dans l'ordre décroissant de ressemblance et accompagné du nombre de kmer (désigné par seed) commun.
	On prendra par défaut des seed espacer(##--##), les entré numéraire devront être traité avant.
*/
exports.printBestMatcheur = function (n, seed, pathRead, pathGerm) {
	var table = bestMatcheur(n,seed,pathRead,pathGerm);
	for (var i = 0; i < table.length; i++) {
		for (var j = 0; j < table[i].length; j++) {
			console.log(table[i][j] + '\n');
		}
	}
}