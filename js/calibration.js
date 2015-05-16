var controller = {enableGestures: true};

var loc1, loc2, loc3, loc4;
var position

Leap.loop(controller, function(frame){
	if(frame.pointables.length > 0){
		var pointable = frame.pointables[0];
		position = pointable.tipPosition;
		document.getElementById("currentPointable").innerHTML = position;
	}
})

document.onkeypress = function(event) {
	// console.log("keypress")
	if(event.keyCode == 49){
		console.log("1 pressed");
		loc1 = position;
		document.getElementById("location1").innerHTML = loc1;
	}
	else if(event.keyCode == 50){
		console.log("2 pressed");
		loc2 = position;
		document.getElementById("location2").innerHTML = loc2;
	}
	else if(event.keyCode == 51){
		console.log("3 pressed");
		loc3 = position;
		document.getElementById("location3").innerHTML = loc3;
	}
	else if(event.keyCode == 52){
		console.log("4 pressed");
		loc4 = position;
		document.getElementById("location4").innerHTML = loc4;
	}
}