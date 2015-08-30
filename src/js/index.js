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

		if(timeoutID){
			clearTimeout(timeoutID);
			timeoutID= null;
		}
		if(intervalID){
			clearInterval(intervalID);
			intervalID= null;
		}

		timeoutID= setTimeout(runAuto, 90000);

		e.preventDefault();
		motion.move(e.deltaY);
		requestAnimationFrame(render);
	});

	var timeoutID= null,
		intervalID= null;

	var runAuto= function(){

		if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
			return;
		}

		if(intervalID){
			clearInterval(intervalID);
			intervalID= null;
		}

		intervalID= setInterval(function(){
			motion.move(1, true);
			requestAnimationFrame(render);
		}, 16);
	};
	runAuto();

});
