// Находим холст на странице
let canv = document.querySelector('#canv');
// Берём контекст холста
let ctx = canv.getContext('2d');

// Прямоугольники
// ctx.strokeRect(x, y, ширина, высота)
// ctx.strokeStyle = 'red'
let gradient = ctx.createLinearGradient(100, 100, 150, 300);
gradient.addColorStop('0.0', 'magenta')
gradient.addColorStop('0.5', 'blue')
gradient.addColorStop('1.0', 'red')
ctx.strokeStyle = gradient
ctx.lineWidth = "5";
ctx.strokeRect(100, 100, 50, 200)

ctx.fillStyle = gradient;
ctx.fillRect(300, 100, 150, 100);

ctx.clearRect(120, 120, 250, 100);

ctx.fillStyle = 'black';
for (let i = 0; i < 10; i++) {
	ctx.fillRect(i*30, 400, 20, 20);
}

// Линии и дуги
ctx.beginPath()
ctx.arc(40, 70, 30, 0, Math.PI/2, true);
ctx.fill()
ctx.moveTo(55, 30);
ctx.lineTo(300, 20);
ctx.lineTo(300, 400);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = "green";
ctx.moveTo(0, 0);
for (let i = 0; i < 10; i++) {
	let x = Math.round(Math.random()*500)
	let y = Math.round(Math.random()*500)
	ctx.lineTo(x, y);
}

// ctx.bezierCurveTo(25, 79, 100, 220, 100, 100);
ctx.stroke();
ctx.fill()

canv.onmousemove = function(event) {
	let target = canv.getBoundingClientRect()
	let x = event.clientX - target.left
	let y = event.clientY - target.top

	$('#info').text("X: " + x + " Y: " + y)
}

canv.onclick = function(event) {
	let target = canv.getBoundingClientRect()
	let x = event.clientX - target.left
	let y = event.clientY - target.top

	const pixel = ctx.getImageData(x, y, 1, 1)
	let r = pixel.data[0]
	let g = pixel.data[1]
	let b = pixel.data[2]
	let a = pixel.data[3]

	$('#colorCode').text('(R:' + r + ', G:' + g + ', B:' + b + ', A:' + a +')');
	$('#color').css('background-color', 'rgba('+r+','+g+','+b+','+a+')');
}
