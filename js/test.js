//returns scalar dot product of two vectors v1 and v2
function getDotProduct(v1, v2)	{
	return v1.i * v2.i + v1.j * v2.j + v1.k * v2.k;
}

//returns cross product vector normal to v1 and v2
function getCrossProduct(v1, v2) {
	i = (v1.j * v2.k - v2.j * v1.k);
	j = (v2.i * v1.k - v1.i * v2.k);
	k = (v1.i * v2.j - v2.i * v1.j);

	n = {"i":i, "j":j, "k":k};

	return n;
}

//returns the magnitude of a vector v
function getVectorMagnitude(v)	{
	return Math.sqrt(getDotProduct(v, v));
}

function getUnitVector(v)	{
	v_magnitude = getVectorMagnitude(v);

	x_comp = v.i / v_magnitude;
	y_comp = v.j / v_magnitude;
	z_comp = v.k / v_magnitude;

	unitvector = {"i":x_comp, "j":y_comp, "k":z_comp};

	return unitvector;
}

//subtracts the two points to get a vector pointing towards point2 from point1
function getVectorFromPoints(point1, point2)  {
	delta_x = point2[0] - point1[0];
	delta_y = point2[1] - point1[1];
	delta_z = point2[2] - point1[2];

	vector = {"i":delta_x, "j":delta_y, "k":delta_z};

	return vector;
}

//point1, point2, point3 are arrays, each one contains xyz coordinates (e.g. point1[0] returns x coordinate)
//returns plane in associate array form
//plane is analogous to a(x - x0) + b(y - y0) + c(z - z0) = 0
function getEquationOfPlaneFromPoints(point1, point2, point3) {
	//taking point1 as center/origin (0, 0, 0)
	v1 = getVectorFromPoints(point1, point2);
	v2 = getVectorFromPoints(point1, point3);

	n = getCrossProduct(v1, v2);

	unitNormal = getUnitVector(n);

	unitNormal = {"i":Math.abs(unitNormal.i), "j":Math.abs(unitNormal.j), "k":Math.abs(unitNormal.k)};

	//plane = {"normal":n, "point":point1};
	plane = {"normal":unitNormal, "point":point1};

	return plane;
}

//point is an array, indices correspond to x, y, z respectively (e.g. 0 is x)
//plane is associative array containing normal vector and the center point
function getDistanceFromPointToPlane(point, plane)	{
	v = getVectorFromPoints(plane.point, point);
	n = plane.normal;

	distance = (Math.abs(getDotProduct(n, v)) / getVectorMagnitude(n));

	return distance;
}

//points are the same as the ones used in the equation
//convert 3d coordinates to 2d using coefficients of v1, v2 vectors as amounts of x and y coordinates
function getBoxDimensions()	{
	//taking point1 as center/origin (0, 0, 0)
	// v1 = getVectorFromPoints(point1, point2);
	// v2 = getVectorFromPoints(point2, point3);
	v1 = getVectorFromPoints(regionTopLeft, regionTopRight);
	v2 = getVectorFromPoints(regionTopRight, regionbottomRight);
	///WARNING: the v2 vector is different from the getEquationOfPlaneFromPoints method because it points from point2 to point3

	// unit vectors are not necessary because the distance of the v1 and v2 vectors will also give the coefficients of the unit vectors
	// v1_unit = getUnitVector(v1);
	// v2_unit = getUnitVector(v2);

	horizontal_dimension = getVectorMagnitude(v1);
	vertical_dimension = getVectorMagnitude(v2);

	//dimensions contains the x and y dimensions of a rectangular box sectioned off within the 3D coordinate plane
	dimensions = {"x":horizontal_dimension, "y":vertical_dimension};

	return dimensions;
}

function getDistanceBetweenPoints(point1, point2)	{
	d_squared = (((point2[2] - point1[2]) * (point2[2] - point1[2])) + ((point2[1] - point1[1]) * (point2[1] - point1[1])) + ((point2[0] - point1[0]) * (point2[0] - point1[0])));

	distance = Math.sqrt(d_squared);

	return distance;
}

function convert3DPointOntoBox(point)	{
	v_to_point = {"i":dist * plane.normal.i, "j":dist * plane.normal.j, "k":dist * plane.normal.k};

	point_on_plane = [(point[0] - v_to_point.i), (point[1] - v_to_point.j), (point[2] - v_to_point.k)];


}


///////////////////////////////////////////////////
var controller = {enableGestures: true};

var regionTopLeft, regionTopRight, regionBottomRight, regionBottomLeft;
var position;
var plane;
var dist;
var threshold = 40;
var isTouch;
var planepoint;
var distFormulaValue


Leap.loop(controller, function(frame){
	if(frame.pointables.length > 0){
		var pointable = frame.pointables[0];
		position = pointable.tipPosition;
		document.getElementById("currentPointable").innerHTML = position;
	}
	
	if(plane){
		dist = getDistanceFromPointToPlane(position, plane);
		document.getElementById("distToPlane").innerHTML = dist;

		if(dist < threshold){
			isTouch = true;
			document.getElementById("touch").innerHTML = isTouch;
		}
		else{
			isTouch = false;
			document.getElementById("touch").innerHTML = isTouch;
		}
		planepoint = convert3DPointOntoBox(position);

		distFormulaValue = getDistanceBetweenPoints(position, point_on_plane);

		document.getElementById("distFormula").innerHTML = distFormulaValue;
		document.getElementById("norm").innerHTML = "x: " + plane.normal.i + "<br>y: " + plane.normal.j + "<br>z: " + plane.normal.k;
		document.getElementById("point").innerHTML = "x: " + point_on_plane[0] + "<br>y: " + point_on_plane[1] + "<br>z: " + point_on_plane[2];
	}
	

})

document.onkeypress = function(event) {
	// console.log("keypress")
	if(event.keyCode == 49){
		console.log("1 pressed");
		regionTopLeft = position;
		document.getElementById("topLeft").innerHTML = regionTopLeft;
	}
	else if(event.keyCode == 50){
		console.log("2 pressed");
		regionTopRight = position;
		document.getElementById("topRight").innerHTML = regionTopRight;
	}
	else if(event.keyCode == 51){
		console.log("3 pressed");
		regionBottomRight = position;
		document.getElementById("botRight").innerHTML = regionBottomRight;
	}
	else if(event.keyCode == 52){
		console.log("4 pressed");
		regionBottomLeft = position;
		document.getElementById("botLeft").innerHTML = regionBottomLeft;
	}

	else if(event.keyCode == 68 || event.keyCode == 100)	{
		plane = getEquationOfPlaneFromPoints(regionTopLeft, regionTopRight, regionBottomRight);
		console.log(plane);
	}
}

