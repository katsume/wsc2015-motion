var _= require('underscore');

var Context= require('../models/context'),
	Math= require('../libs/math');

var Renderer= function(model, elm){

	this._model= model;

	var canvas= document.createElement('canvas');
	elm.appendChild(canvas);

	window.addEventListener('resize', this._resizeHandler.bind(this));

	this._canvas= canvas;
	this._context= canvas.getContext('2d');
	this._resizeHandler();
};

Renderer.prototype._resizeHandler= function(){

	var width= window.innerWidth,
		height= window.innerHeight;

	if(!navigator.userAgent.match(/iPhone|iPad|iPod/i)){
		width/= 2;
	}

	this._width= this._canvas.width= width;
	this._height= this._canvas.height= height;
	this._ox= width/2;
	this._oy= height/2;
};

Renderer.prototype.render= function(){

	var points= this._model.points,
		numOfFrames= this._model.numOfFrames,
		currentFrameIndex= this._model.currentFrameIndex;

	if(!points || !points.length){
		return;
	}

	var context= this._context,
		size= Context.POINT_SIZE;

	context.clearRect(0, 0, this._width, this._height);

	this._renderVerticalLines();
	this._renderHorizontalLines();
	this._renderPoints();

};

Renderer.prototype._renderVerticalLines= function(){

	if(Context.VERTICAL_LINE_WIDTH<=0){
		return;
	}

	var context= this._context,
		currentFrameIndex= this._model.currentFrameIndex,
		numOfFrames= this._model.numOfFrames;

	context.strokeStyle= Context.VERTICAL_LINE_COLOR;
	context.lineWidth= Context.VERTICAL_LINE_WIDTH;

	this._model.points.forEach(function(point, index){
		this._renderVerticalLine(point, currentFrameIndex, numOfFrames);
	}, this);
};

Renderer.prototype._renderVerticalLine= function(point, currentFrameIndex, numOfFrames){

	var context= this._context;

	var i,
		pt,
		x,
		y,
		c;

	i= currentFrameIndex;
	pt= point[i],
	x= this._ox+pt[0],
	y= this._oy+pt[1],
	c=0;
	context.beginPath();
	context.moveTo(x, y);
	while(y>=0) {

		pt= point[i];
		x= this._ox+pt[0];
		y= this._oy+pt[1]-Context.VERTICAL_LINE_STEP*c;

		context.lineTo(x, y);

		i= Math.wrap(i-1, 0, numOfFrames-1)

		c++;
	}
	context.stroke();

	i= currentFrameIndex;
	pt= point[i],
	x= this._ox+pt[0],
	y= this._oy+pt[1],
	c=0;
	context.beginPath();
	context.moveTo(x, y);
	while(y<this._height){

		pt= point[i];
		x= this._ox+pt[0];
		y= this._oy+pt[1]+Context.VERTICAL_LINE_STEP*c;

		context.lineTo(x, y);

		i= Math.wrap(i+1, 0, numOfFrames-1)

		c++;
	}
	context.stroke();
};

Renderer.prototype._renderHorizontalLines= function(){

	if(Context.HORIZONTAL_LINE_WIDTH<=0){
		return;
	}

	var context= this._context,
		currentFrameIndex= this._model.currentFrameIndex;

	context.strokeStyle= Context.HORIZONTAL_LINE_COLOR;
	context.lineWidth= Context.HORIZONTAL_LINE_WIDTH;

	this._model.points.forEach(function(point, index){
		var p= point[currentFrameIndex];
		this._renderHorizontalLine(p, context);
	}, this);
};

Renderer.prototype._renderHorizontalLine= function(p, context){

	context.beginPath();
	context.moveTo(0, this._oy+p[1]);
	context.lineTo(this._width, this._oy+p[1]);
	context.stroke();
};

Renderer.prototype._renderPoints= function(){

	if(Context.POINT_SIZE<=0){
		return;
	}

	var context= this._context,
		currentFrameIndex= this._model.currentFrameIndex;

	context.fillStyle= Context.POINT_COLOR;

	this._model.points.forEach(function(point, index){

		var p= point[currentFrameIndex];

		// context.fillRect(ox+p[0]-size/2, oy+p[1]-size/2, size, size);

		context.beginPath();
		context.arc(this._ox+p[0], this._oy+p[1], Context.POINT_SIZE, 0, Math.PI*2);
		context.fill();

	}, this);
};

module.exports= Renderer;
