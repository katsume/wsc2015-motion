var POINTS_PER_FIGURE= 13;

module.exports= function(src){

	var lines= src.trim().split('\n'),
		frame= [],
		frames= [],
		scale= 1;

	lines.forEach(function(line){
		var components= line.trim().split('\t');

		components= components.map(function(component){
			return Number(component)*scale;
		});

		//	Right
		frame.push([
			-components[0],
			-components[2],
			components[1]
		]);

		//	Front
		// frame.push([
		// 	components[1],
		// 	-components[2],
		// 	components[0]
		// ]);

		if(frame.length>=POINTS_PER_FIGURE){
			frames.push(frame);
			frame= [];
		}
	});

	return frames;
};
