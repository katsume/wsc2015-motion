var Qs= require('qs'),
	_= require('underscore');

var POINTS_PER_FIGURE= 13;

var query= Qs.parse(location.search.substring(1)),
	indices= [];

if(query.p && query.p.length>0){
	query.p.split(',').forEach(function(str){
		indices.push(Number(str));
	});
} else {
	indices= _.range(POINTS_PER_FIGURE);
}

module.exports= {

	indices: indices,
	POINTS_PER_FIGURE: POINTS_PER_FIGURE,

	POINT_SIZE: 6,
	POINT_COLOR: '#fff',

	VERTICAL_LINE_WIDTH: 1,
	VERTICAL_LINE_COLOR: '#666',
	VERTICAL_LINE_STEP: 4,

	HORIZONTAL_LINE_WIDTH: 1,
	HORIZONTAL_LINE_COLOR: '#ccc'
};
