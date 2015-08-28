var NUM_OF_SEGMENTS= 7;

Array.prototype.sum= function(p){

	return this.map(function(component, index){
		return component+p[index];
	});
};

var sum= function(src1, src2){

	var i,
		dst= [];

	if(src1.length!==src2.length){
		return dst;
	}

	for(i=0; i<src1.length; i++){
		dst.push(src1[i]+src2[i]);
	}

	return dst;
};

module.exports= function(data){

	var averagePositions= new Array(NUM_OF_SEGMENTS),
		numOfPositions= new Array(NUM_OF_SEGMENTS);

	var addToAverage= function(index, point){

		averagePositions[index]= averagePositions[index]||[0, 0, 0];
		numOfPositions[index]= numOfPositions[index]||0;

		averagePositions[index]= sum(averagePositions[index], point);
		numOfPositions[index]++;
	};

	data.forEach(function(frame){

		frame.forEach(function(point, index){

			switch (index) {
				case 0:
					addToAverage(0, point);
					break;
				case 1:
				case 2:
					addToAverage(1, point);
					break;
				case 3:
				case 4:
					addToAverage(2, point);
					break;
				case 5:
				case 6:
					addToAverage(3, point);
					break;
				case 7:
				case 8:
					addToAverage(4, point);
					break;
				case 9:
				case 10:
					addToAverage(5, point);
					break;
				case 11:
				case 12:
					addToAverage(6, point);
					break;
				default:
			}
		}, this);
	}, this);

	return averagePositions.map(function(averagePosition, index){
	 	return averagePosition.map(function(component){
			return component/numOfPositions[index];
		});
	});
};
