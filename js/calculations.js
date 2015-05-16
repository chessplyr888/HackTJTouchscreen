//returns cross product vector normal to vectors1 and vector2
function getCrossProduct(v1, v2) {
	i = (v1.j * v2.z - v2.j * v1.k);
	j = (v2.i * v1.k - v1.i * v2.k);
	k = (v1.i * v2.j - v2.i * v1.j);

	n = {"i":i, "j":j, "k":k};

	return n;
}

//subtracts the two points to get a vector pointing towards point2 from point1
function getVectorFromPoints(point1, point2)  {
	delta_x = point2[0] - point1[0];
	delta_y = point2[1] - point1[1];
	delta_z = point2[2] - point1[2];

	vector = {"i":delta_x, "j":delta_y, "k":delta_z};

	return vector;
}

//point1, point2, point3 are arrays, each one contains xyz coordinates (e.g. point1[])
function getEquationOfPlaneFromPoints(point1, point2, point3) {
	//taking point1 as center/origin (0, 0, 0)
	vector v1 = getVectorFromPoints(point1, point2);
	vector v2 = getVectorFromPoints(point1, point3);

	vector n = getCrossProduct(v1, v2);

	

}