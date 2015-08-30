var Qs= require('qs'),
	_= require('underscore');

var model= {

		indices: [],
		POINTS_PER_FIGURE: 13,
		NUM_OF_INTERPOLATION: 2

	},
	view= {

		SCALE: 1.2,

		POINT_SIZE: 4,
		POINT_COLOR: '#fff',

		VERTICAL_LINE_WIDTH: 2,
		VERTICAL_LINE_COLOR: '#1a1a1a',
		VERTICAL_LINE_STEP: 4,

		HORIZONTAL_LINE_WIDTH: 1,
		HORIZONTAL_LINE_COLOR: '#1a1a1a'

	},
	viewIOS= {

		SCALE: 1.2,

		POINT_SIZE: 8,
		POINT_COLOR: '#fff',

		VERTICAL_LINE_WIDTH: 4,
		VERTICAL_LINE_COLOR: '#666',
		VERTICAL_LINE_STEP: 4,

		HORIZONTAL_LINE_WIDTH: 4,
		HORIZONTAL_LINE_COLOR: '#999'

	};

var query= Qs.parse(location.search.substring(1));

if(query.p && query.p.length>0){
	query.p.split(',').forEach(function(str){
		model.indices.push(Number(str));
	});
} else {
	model.indices= _.range(model.POINTS_PER_FIGURE);
}

module.exports= _.extend(model, navigator.userAgent.match(/iPhone|iPad|iPod/i) ? viewIOS : view);
