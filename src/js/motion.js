var $= require('jquery');

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

			var parsedData= this._parse(data),
				interpolatedData= this._interpolate(parsedData),
				averagePositions= this._getAveragePositions(interpolatedData);

			this._data= interpolatedData;
		},
		error: function(jqXHR, textStatus, errorThrown){
			throw new Error(textStatus+' : '+errorThrown);
		}
	});
};

Motion.prototype._parse= require('./motion-parse');

Motion.prototype._interpolate= require('./motion-interpolate');

Motion.prototype._getAveragePositions= require('./motion-averagePosition.js');

// Motion.prototype._arrange= function(data){
//
// 	var averagePositions= this._getAveragePositions(data);
//
// 	return;
// 	data.forEach(function(frame){
//
// 		frame.forEach(function(point, index){
//
// 			switch (index) {
// 				case 0:
// 					point[1]= averagePositions[0][1];
// 					break;
// 				case 1:
// 				case 2:
// 					point[1]= averagePositions[1][1];
// 					break;
// 				case 3:
// 				case 4:
// 					point[1]= averagePositions[2][1];
// 					break;
// 				case 5:
// 				case 6:
// 					point[1]= averagePositions[3][1];
// 					break;
// 				case 7:
// 				case 8:
// 					point[1]= averagePositions[4][1];
// 					break;
// 				case 9:
// 				case 10:
// 					point[1]= averagePositions[5][1];
// 					break;
// 				case 11:
// 				case 12:
// 					point[1]= averagePositions[6][1];
// 					break;
// 				default:
// 			}
// 		}, this);
// 	}, this);
// };

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

	var diff= delta<0 ? -1 : 1;
	this._index+= diff;

	if(this._index<0){
		this._index= this._data.length-1;
	} else if(this._index>=this._data.length){
		this._index= 0;
	}
};

Motion.prototype.getPoints= function(){
	return this._data[this._index];
};

module.exports= Motion;
