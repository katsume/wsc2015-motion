var _= require('underscore');

var Context= require('./context');

module.exports= function(src){

	var lines= src.trim().split('\n'),
		// frame= [],
		// frames= [],
		scale= 1.5;

	var points= new Array(Context.POINTS_PER_FIGURE),
		currentPointIndex= 0;

	lines.forEach(function(line){
		var components= line.trim().split('\t');

		components= components.map(function(component){
			return Number(component)*scale;
		});

		points[currentPointIndex]= points[currentPointIndex]||[];

		//	Right
		var point= [
			-components[0],
			-components[2],
			components[1]
		];

		//	Front
		// var point= [
		// 	components[1],
		// 	-components[2],
		// 	components[0]
		// ];

		points[currentPointIndex].push(point);

		currentPointIndex++;
		if(currentPointIndex>=Context.POINTS_PER_FIGURE){
			currentPointIndex= 0;
		}

		// if(frame.length>=POINTS_PER_FIGURE){
		// 	frames.push(frame);
		// 	frame= [];
		// }
	});

	points= _.filter(points, function(point, index){
		return _.contains(Context.indices, index);
	});

	return points;
};
