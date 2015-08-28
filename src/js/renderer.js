var Renderer= function(elm){

	var canvas= document.createElement('canvas');
	elm.appendChild(canvas);

	window.addEventListener('resize', this._resizeHandler.bind(this));

	this._canvas= canvas;
	this._context= canvas.getContext('2d');
	this._resizeHandler();
};

Renderer.prototype._resizeHandler= function(){

	this._canvas.width= window.innerWidth;
	this._canvas.height= window.innerHeight;
};

Renderer.prototype.render= function(data){

	if(!data || !data.length){
		return;
	}

	var context= this._context,
		size= 4,
		ox= this._canvas.width/2,
		oy= this._canvas.height/2;

	context.fillStyle= 'white';
	context.clearRect(0, 0, this._canvas.width, this._canvas.height);

	data.forEach(function(point){
		context.fillRect(ox+point[0]-size/2, oy+point[1]-size/2, size, size);
	});
};

module.exports= Renderer;
