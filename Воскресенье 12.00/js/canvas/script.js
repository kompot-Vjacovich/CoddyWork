window.onload = function() {
	let canv = $('#canv');

	canv.drawRect({
		fillStyle: 'red',
		strokeStyle: 'black',
		strokeWidth: 5,
		width: 200, height: 100,
		rounded: true,
		x: 150, y: 50,
		fromCenter: false,
		chtoTo: 651789
	}).drawArc({
		fillStyle: 'green',
		strokeStyle: 'black',
		strokeWidth: 5,
		x: 550, y: 200,
		radius: 100,
		start: 45, end: 180,
		closed: true
	});

	canv.drawPath({
		fillStyle: 'orange',
		p1: {
			type: 'line',
			strokeStyle: 'blue',
			strokeWidth: 10,
			x1: 700, y1: 50,
			x2: 700, y2: 450,
			x3: 900, y3: 200			
		},
		p2: {
			type: 'quadratic',
			strokeStyle: 'blue',
			strokeWidth: 10,
			cx1: 300, cy1: 300,
			x2: 400, y2: 450,
			cx2: 500, cy2: 300,
			x3: 600, y3: 450
		},
	})
}