exports.matrixToArray = function (matrix) {
    var res = [] ;

    for (var i = matrix.length -1 ; i >= 0 ; i--) {
	for (var j = matrix[i].length -1 ; j >= 0 ; j--) {
	    res.unshift(matrix[i][j]) ;
	}
    }
    return res ;
}
