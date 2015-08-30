var Context= require('./context');

var interpolateFrame= function(currentFrame, nextFrame){

	var i,
		newFrames= [],
		newFrame,
		numOfInterpolation= Context.NUM_OF_INTERPOLATION;

	for(i=0; i<numOfInterpolation; i++){

		newFrame= currentFrame.map(function(component, index){
			return component*((numOfInterpolation-i)/(numOfInterpolation+1))+nextFrame[index]*((i+1)/(numOfInterpolation+1));
		});

		newFrames.push(newFrame);
	}

	return newFrames;
};

var interpolatePoint= function(point){

	var i;

	var currentFrame,
		nextFrame,
		newFrames;

	for(i=point.length-1; 0<=i; i--){

		currentFrame= point[i];
		nextFrame= i<point.length-1 ? point[i+1] : point[0];
		newFrames= interpolateFrame(currentFrame, nextFrame);

		point.splice.apply(point, [i+1, 0].concat(newFrames));
	}
};

module.exports= function(src){

	var i,
		dst= [].concat(src);

	for(i=0; i<dst.length; i++){
		interpolatePoint(dst[i]);
	}

	return dst;
};
