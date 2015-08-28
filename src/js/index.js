var Motion= require('./motion'),
	Renderer= require('./renderer');

String.prototype.trim= function(){
	return this.replace(/^\s+|\s+$/g, "");
};

document.addEventListener('DOMContentLoaded', function(){
	'use strict';

	var motion= new Motion(),
		renderer= new Renderer(document.querySelector('.stage'));

	document.body.addEventListener('mousewheel', function(e){
		e.preventDefault();

		motion.move(e.deltaY);
		renderer.render(motion.getData());
	});
});
