
const graine = require('./graine.js');
const kmerer = require('./kmers.js');
const fasta = require('./fastaParser');

/*
	renvoie un tableau contenant le ratio de ressemblance et le nombre de kmer commun entre deux séquence
*/
var matcheur = function (seqA, seqB, seed) {
	/*
		applique kmerer.arrayOfKmersBySeed pour obtenir les kmers de chaqu'une des deux séquence
		compare et obtien le ratio et le nombre de kmer commun
		retourne un tableau contenant séparément le ratio et le nombre de kmer commun.
	*/
	var tableA = kmerer.sequenceToKmers(seqA,graine.seedToRegex(seed, graine.translate),seed.replace(/-/g, '').length)});
	var tableB = kmerer.sequenceToKmers(seqB,graine.seedToRegex(seed, graine.translate),seed.replace(/-/g, '').length)});
	var retour[0] = kmerer.commonKmersRatio(tableA,tableB);
	var retour[1] = (retour[0].length)/(tableB.length);
	return retour;
}

/*
	à partir d'un json de sequence, renvois un tableau des sequences sous forme de string
*/

var arrayOfSequence = function(json) {
    return json.sequences.map(function(json){return json.sequence ;}) ; //génération d'un tableau de string à partir de l'objet json
}

/*
	trie les tableau constitué de sortie de matcheur.
*/
var trieurDeMatch = function(table) {
	var tabloide = table;
	var bulle = 0;
	var tampon;
	while (bulle < tabloide.length){
		if (tabloide[bulle][1] > tabloide[bulle+1][1]) {
			tampon = tabloide[bulle];
			tabloide[bulle] = tabloide[bulle+1];
			tabloide[bulle+1] = tampon;
			bulle = 0;
		} else {
			bulle++;
		}
	}
	return tabloide;
}

/*
	retourne un tableau de tableau contenant les n séquences de pathGerm les plus ressemblante à pathRead à l'aide du seed, 
	pour chaque séquence trouvé dans pathRead.
	Le tableau donne les séquence par ordre de ressemblance suivit du nombre de kmer (désigné par le seed) commun.
	Le seed doit être une graine (##--##), les entrés numéraire doivent avoir était traduit avant.
*/
var bestMatcheurListeur = function (seed, pathRead, pathGerm) {
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
	var germStrings = arrayOfSequence(fasta.fastaFileToJsonObject(pathGerm));
	var readStrings = arrayOfSequence(fasta.fastaFileToJsonObject(pathRead));
	var grandTableauRetour;
	for (var i = 0; i < readStrings.length; i++) {
		var tableauRetour;
		for (var j = 0; j < germStrings.length; j++) {
			tableauRetour[j] = matcheur(germStrings[j],readStrings[i],seed);
		}
		tableauRetour = trieurDeMatch(tableauRetour);
		grandTableauRetour[i] = tableauRetour;
	}
	return grandTableauRetour;

}


/*
	écrit à l'écran les n séquence de pathGerm ressemblant le plus à pathRead à l'aide du seed. 
	L'affichage doit se faire dans l'ordre décroissant de ressemblance et accompagné du nombre de kmer (désigné par seed) commun.
	On prendra par défaut des graine espacer(##--##), les entré numéraire devront être traité avant (transformé en suite de #).
*/
exports.printBestMatcheur = function (n, seed, pathRead, pathGerm) {
	var table = bestMatcheurListeur(seed,pathRead,pathGerm);
	for (var i = 0; i < table.length; i++) {
		for (var j = 0; j < table[i].length && j < n; j++) {
			console.log(table[i][j] + '\n');//manque encore d'indiquer le nom des séquence concerné.
		}
	}
}

/*
	écrit pour chaque séquence trouvé dans pathRead, la meilleurs séquence V et J qui compose la dite séquence.
*/
exports.printDiscover = function (seed, pathRead, pathGermV, pathGermJ) {
	// body...
}






