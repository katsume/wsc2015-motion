var Context= require('./models/context'),
	Motion= require('./models/motion'),
	Renderer= require('./views/renderer');

String.prototype.trim= function(){
	return this.replace(/^\s+|\s+$/g, "");
};

document.addEventListener('DOMContentLoaded', function(){
	'use strict';

	var motion= new Motion(),
		renderer= new Renderer(motion, document.querySelector('.stage'));

	var delta= 0;

	var render= function(){
		renderer.render();
	};

	motion.on('refresh', function(){
		requestAnimationFrame(render);
	});

	document.body.addEventListener('mousewheel', function(e){
		e.preventDefault();
		motion.move(e.deltaY);
		requestAnimationFrame(render);
	});
});
