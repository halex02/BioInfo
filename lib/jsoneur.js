var fs = require("fs");

function jsoneur (path) {
	var table = {sequences:[id:,length:,sequence:]};
	var fid;
	fs.open(path,'r',function(err,fd) {
			if (err) {
				console.log(err.message);
			} else {
				fid = fd;
			}
		}
	);
	var data;
//boucler le read pour récupérer packet par packet jusqu'au bout du fichier
	fs.read(fid,data,6,9)

	fs.close(fid, function(err) {
			if (err) {
				console.log(err.message);
			}
		}
	);
//traiter data, séparer les ids et les sequences, récupérer les longueur, fourguer tout dans table.
	return table;
}