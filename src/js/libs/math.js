var _= require('underscore');

module.exports= _.extend(Math, {
	wrap: function(val, from, to){
		if(val<from){
			return to-(from-val)%(to-from);
		} else if(to<=val){
			return from+(val-to)%(to-from);
		}
		return val;
	},
	lerp: function(start, stop, value){
		return start+value*(stop-start);
	},
	sign: function(val){
		return val<0 ? -1 : 1;
	}
});
