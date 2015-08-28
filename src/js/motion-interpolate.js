var NUM_OF_INTERPOLATION= 3;

var interpolateFrame= function(currentFrame, nextFrame){

	var i,
		j;

	var newFrames= new Array(NUM_OF_INTERPOLATION);

	var currentPoint,
		nextPoint,
		newPoint;

	for(i=0; i<currentFrame.length; i++){

		currentPoint= currentFrame[i];
		nextPoint= nextFrame[i];

		for(j=0; j<NUM_OF_INTERPOLATION; j++){

			newPoint= currentPoint.map(function(component, index){
				return component*((NUM_OF_INTERPOLATION-j)/(NUM_OF_INTERPOLATION+1))+nextPoint[index]*((j+1)/(NUM_OF_INTERPOLATION+1));
			});

			newFrames[j]= newFrames[j]||[];
			newFrames[j].push(newPoint);
		}

	}

	return newFrames;
};

module.exports= function(src){

	var i;

	var currentFrame,
		nextFrame,
		newFrames;

	var dst= [].concat(src);

	for(i=dst.length-1; 0<=i; i--){

		currentFrame= dst[i];
		nextFrame= i<dst.length-1 ? dst[i+1] : dst[0];
		newFrames= interpolateFrame(currentFrame, nextFrame);

		dst.splice.apply(dst, [i+1, 0].concat(newFrames));
	}

	return dst;
};
