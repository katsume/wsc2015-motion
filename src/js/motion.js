var _= require('underscore'),
	$= require('jquery');

var DIMENTIONS= 3,
	POINTS_PER_FIGURE= 13;

var NUM_OF_INTERPOLATION= 3;

var NUM_OF_SEGMENTS= 7;

var Motion= function(){

	this._data= [];
	this._index= [];

	this._fetch();
};

Motion.prototype._fetch= function(){

	$.ajax({
		url: './walk.txt',
		context: this,
		success: function(data){
			this._data= this._parseData(data);
		},
		error: function(jqXHR, textStatus, errorThrown){
			throw new Error(textStatus+' : '+errorThrown);
		}
	});
};

Motion.prototype._parseData= function(src){

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

	this._interpolate(frames);

	this._arrange(frames);

	return frames;
};

Motion.prototype._interpolate= function(data){

	var i;

	var currentFrame,
		nextFrame,
		newFrames;

	for(i=data.length-1; 0<=i; i--){

		currentFrame= data[i];
		nextFrame= i<data.length-1 ? data[i+1] : data[0];
		newFrames= this._interpolateFrame(currentFrame, nextFrame);

		data.splice.apply(data, [i+1, 0].concat(newFrames));
	}
};

Motion.prototype._interpolateFrame= function(currentFrame, nextFrame){

	var i,
		j;

	var newFrames= [];

	var currentPoint,
		nextPoint,
		newPoint;

	_.times(NUM_OF_INTERPOLATION, function(){
		newFrames.push([]);
	});

	for(i=0; i<currentFrame.length; i++){

		currentPoint= currentFrame[i];
		nextPoint= nextFrame[i];

		for(j=0; j<NUM_OF_INTERPOLATION; j++){

			newPoint= currentPoint.map(function(component, index){
				return component*((NUM_OF_INTERPOLATION-j)/(NUM_OF_INTERPOLATION+1))+nextPoint[index]*((j+1)/(NUM_OF_INTERPOLATION+1));
			});

			newFrames[j].push(newPoint);
		}

	}

	return newFrames;
};

Motion.prototype._arrange= function(data){

	var averagePoints= [],
		numOfPoints= [];

	_.times(NUM_OF_SEGMENTS, function(){
		averagePoints.push([0, 0, 0]);
		numOfPoints.push(0);
	});

	data.forEach(function(frame){

		frame.forEach(function(point, index){

			switch (index) {
				case 0:
					averagePoints[0]= averagePoints[0].sum(point);
					numOfPoints[0]++;
					break;
				case 1:
				case 2:
					averagePoints[1]= averagePoints[1].sum(point);
					numOfPoints[1]++;
					break;
				case 3:
				case 4:
					averagePoints[2]= averagePoints[2].sum(point);
					numOfPoints[2]++;
					break;
				case 5:
				case 6:
					averagePoints[3]= averagePoints[3].sum(point);
					numOfPoints[3]++;
					break;
				case 7:
				case 8:
					averagePoints[4]= averagePoints[4].sum(point);
					numOfPoints[4]++;
					break;
				case 9:
				case 10:
					averagePoints[5]= averagePoints[5].sum(point);
					numOfPoints[5]++;
					break;
				case 11:
				case 12:
					averagePoints[6]= averagePoints[6].sum(point);
					numOfPoints[6]++;
					break;
				default:
			}
		}, this);
	}, this);

	averagePoints= averagePoints.map(function(averagePoint, index){
	 	return averagePoint.map(function(component){
			return component/numOfPoints[index];
		});
	});

	// console.log(averagePoints);
};

Array.prototype.sum= function(p){

	return this.map(function(component, index){
		return component+p[index];
	});
};

// Motion.prototype.loop= function(){
//
// 	if(!this._data.length){
// 		return;
// 	}
//
// 	this._index++;
// 	if(this._index>=this._data.length){
// 		this._index= 0;
// 	}
// };

Motion.prototype.move= function(delta){

	if(!this._data.length){
		return;
	}

	this._index+= delta/Math.abs(delta);

	if(this._index<0){
		this._index= this._data.length-1;
	} else if(this._index>=this._data.length){
		this._index= 0;
	}
};

Motion.prototype.getData= function(){
	return this._data[this._index];
};

module.exports= Motion;
