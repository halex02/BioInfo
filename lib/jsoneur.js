var fs = require("fs");

function jsoneur (path) {
	var table = {sequences:[id:,length:,sequence:]};
	var ftexte = fs.readFile(fs.open(path,'r',function(err,fd) {
		console.log(err.message);
	}));
	return table;
}