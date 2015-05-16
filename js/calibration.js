var controller = {enableGestures: true};

Leap.loop(controller, function(frame){
	if(frame.pointables.length > 0){
		var pointable = frame.pointables[0];
		var direction = pointable.direction;
		var length = pointable.length;
		var width = pointable.width;
		var stabilizedPosition = pointable.stabilizedTipPosition;
		var position = pointable.tipPosition;
		var speed = pointable.tipVelocity;
		var touchDistance = pointable.touchDistance;
		var zone = pointable.touchZone;
		console.log(position)
	}
})