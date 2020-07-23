
function checkName(str) {
	let error = $('#tabu')
	error.css('display', 'none');

	let new_str = str.replace(new RegExp(' ', 'g'), '')
	const len = new_str.length
	new_str = new_str.toLowerCase()
	
	let tabu = ['@', '/', '*', ':', '#', 'висилица'];
	let isTabu = false
	for (let i = 0; i < tabu.length; i++) {
		let index = new_str.indexOf(tabu[i])
		if (index != -1) {
			isTabu = true
			error.text('В имени не должны присутствовать: ' + tabu.join() + '!')
			error.css('display', 'block');
		}
	}

	let skip = $('#skip:checked')

	if ((len > 0 && !isTabu) || skip.length != 0) {
		$('#play').prop('disabled', false)
	}
	else {
		$('#play').prop('disabled', true)
	}
}

function getName() {
	let inp = $('#name').val()
	let skip = $('#skip:checked')
	if (skip.length == 0) {
		return inp
	}

	return "Инкогнито"
}

// Функция, которая выбирает рандомный элемент из массива
function randWord() {
	const words = ['волк', 'картина', 'помидор', 'компьютер', 'погода'];
	let random = words[Math.floor(Math.random()*words.length)];
	return random
}

let name;
let word = randWord()
let secret = new Array(word.length).fill('_')
// Осталось угадать
let guess = secret.length
// Массив неправильных букв
let wrong = []
let errors = 1


function main() {
	// Получаем имя игрока
	name = getName()
	// Удаляем со страницы ненужные элементы и вставляем новые
	$('body').empty()

	let div = $('<div class="wrapper">').appendTo('body')
	$('<h1 id="secret">'+secret.join(' ')+'</h1>').appendTo(div)
	let inp = $('<input type="text" id="letter" placeholder="Введите букву" maxlength="1">').appendTo(div)
	$('<button id="game" onclick="game()">Проверить букву</button>').appendTo(div)
	$('<p id="wrong">').appendTo(div)
	let canv = $('<canvas id="canv">Не поддерживается канвас</canvas>').appendTo('body')
	canv.attr({
		width: '1000',
		height: '400'
	});
	inp.focus();
}

function game() {
	let letter = $('#letter').val()
	let isGuessed = false

	for (let i = 0; i < word.length; i++) {
		if (word[i] == letter.toLowerCase()) {
			// Ставим эту букву вместо подчёркивания
			secret[i] = letter.toUpperCase()
			isGuessed = true
			guess--
		}
	}

	if (guess == 0) {
		// Победа
	}
	else if (errors == 10) {
		// Поражение
		lose()
	}
	
	if (!isGuessed) {
		let i = wrong.indexOf(letter.toUpperCase())
		if (i == -1) {
			wrong.push(letter.toUpperCase())
			drawV(errors)
			errors++
		}
	}

	$('#secret').text(secret.join(' '))
	$('#letter').val('')
	$('#letter').focus()
	$('#wrong').text(wrong.join(', '))
}

function drawV(n) {
	let canv = document.querySelector('#canv')
	let ctx = canv.getContext('2d')

	ctx.strokeStyle = "black";
	ctx.lineWidth = 10;
	ctx.beginPath()
	if (n == 1) {
		ctx.moveTo(10, 390);
		ctx.lineTo(210, 390);
	}
	if (n == 2) {
		ctx.moveTo(60, 390);
		ctx.lineTo(60, 50);
	}
	if (n == 3) {
		ctx.moveTo(55, 50);
		ctx.lineTo(350, 50);
	}
	if (n == 4) {
		ctx.lineWidth = 7;
		ctx.moveTo(330, 50);
		ctx.lineTo(330, 150);
	}
	if (n == 5) {
		ctx.lineWidth = 8;
		ctx.arc(330, 170, 20, 0, 2*Math.PI);
	}
	if (n == 6) {
		ctx.lineWidth = 8;
		ctx.moveTo(330, 190);
		ctx.lineTo(330, 270);
	}
	if (n == 7) {
		ctx.lineWidth = 7;
		ctx.moveTo(330, 200);
		ctx.lineTo(310, 240);
	}
	if (n == 8) {
		ctx.lineWidth = 7;
		ctx.moveTo(330, 200);
		ctx.lineTo(350, 240);
	}
	if (n == 9) {
		ctx.lineWidth = 7;
		ctx.moveTo(331, 260);
		ctx.lineTo(310, 300);
	}
	ctx.stroke();
}

function lose() {
	let canv = document.querySelector('#canv')
	let ctx = canv.getContext('2d')
	ctx.strokeStyle = "black";
	ctx.lineWidth = 7;
	ctx.beginPath()
	ctx.moveTo(329, 260);
	ctx.lineTo(350, 300);
	ctx.stroke()

	// Рисуем стрелку с использованием JCanvas
	$('#canv').drawLine({
		strokeStyle: "black",
		strokeWidth: 10,
		// Стрелка в начале линии
		startArrow: true,
		// Закруглённые углы
		rounded: true,
		// Угол расскрытия стрелки
		arrowAngle: 90,
		// Радиус стрелки (длина лепестков стрелки)
		arrowRadius: 15,
		x1: 450, y1: 170,
		x2: 700, y2: 60
	}).drawText({
		strokeStyle: "black",
		strokeWidth: 4,
		fontSize: 30,
		fontFamily: 'Verdana, sans-serif',
		x: 700, y: 30,
		text: name
	})
}