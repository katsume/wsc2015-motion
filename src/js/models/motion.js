var $= require('jquery'),
	_= require('underscore'),
	Backbone= require('backbone'),
	io= require('socket.io-client');

var Math= require('../libs/math');

var Motion= function(indices){

	this.points= [];
	this.numOfFrames= 0;
	this.currentFrameIndex= 0;

	this._fetch();

	this._socket= io('//'+location.hostname+':8000');
	this._socket.on('walk', function(position){
		this.currentFrameIndex= position;
		this.trigger('refresh');
	}.bind(this));
};

Motion.prototype._fetch= function(){

	$.ajax({
		url: './walk.txt',
		context: this,
		success: function(data){

			var points= this._parse(data),
				interpolatedPoints= this._interpolate(points);

			this.points= interpolatedPoints;
			this.numOfFrames= this.points[0].length;

			this.trigger('refresh');
		},
		error: function(jqXHR, textStatus, errorThrown){
			throw new Error(textStatus+' : '+errorThrown);
		}
	});
};

Motion.prototype._parse= require('./motion-parse');

Motion.prototype._interpolate= require('./motion-interpolate');

Motion.prototype.move= function(delta){

	if(!this.points || !this.points.length){
		return;
	}

	this.currentFrameIndex= Math.wrap(this.currentFrameIndex+Math.sign(delta), 0, this.numOfFrames-1);

	this._socket.emit('walk', this.currentFrameIndex);
};

_.extend(Motion.prototype, Backbone.Events);
module.exports= Motion;
