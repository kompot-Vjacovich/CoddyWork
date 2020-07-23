// Функция, которая выбирает рандомный элемент из массива
function randomWord(massiv) {
	let random = massiv[Math.floor(Math.random()*massiv.length)];
	return random
}

// Функция, которая устанавливает рандомное слово из массива слов
function setWord() {
	const words = ['волк', 'картина', 'помидор', 'компьютер', 'погода'];
	let word = randomWord(words);
	return word
}

let name = "Инкогнито";
let slovo = setWord();
let word = [];
for(let i = 0; i < slovo.length; i++) {
	word[i] = "_";
}
let ostalos = slovo.length;
let errors = 0;
let wrong = [];

// Функция, которая устанавливает имя и создаёт поля с вопросами
function getName() {
	let inp = $('#name').val();
	if (inp.length > 0) {
		name = inp;
	}

	$('body').empty()
	$('body').append('<div class="div">');
	$('.div').append('<h1>'+ word.join(' ') +'</h1>');
	$('.div').append('<input id="ans">');
	$('#ans').focus();
	$('.div').append('<button onclick="game()">Отправить</button>');
	$('body').append('<canvas id="canv"></canvas>');
	$('#canv').attr({
		width: '1000',
		height: '500'
	});
	$('.div').height('118px')
}

function game() {
	let letter = $('#ans').val().toLowerCase();
	let ugadal = false;

	for (var i = 0; i < slovo.length; i++) {
		if (slovo[i] == letter) {
			word[i] = letter.toUpperCase();
			ugadal = true;
			ostalos--;
		}
	}

	if (ugadal == false) {
		errors++;
		wrong.push(letter.toUpperCase())
		drawV(errors)
	}

	if (ostalos == 0) {
		$('.div').empty();
		$('#canv').fadeOut(2000, function(){
			let canv = $('#canv');
			canv.clearCanvas();
			canv.drawText({
				strokeStyle: '#000',
				strokeWidth: 5,
				fromCenter: false,
				x: 320, y: 80,
				fontSize: 48,
				fontFamily: 'Verdana, sans-serif',
				text: name+', ты выиграл!'
			})
		});
		$('#canv').fadeIn(2000)	
	}
	else if (errors == 10) {
		// удалить div
		// написать функцию theEnd(), которая рисует вторую ногу и стрелку с именем
		lose();
	}
	else {
		$('.div').empty();
		$('.div').append('<h1>'+ word.join(' ') +'</h1>');
		$('.div').append('<p>'+ wrong.join(', ') +'</p>');
		$('.div').append('<input id="ans">');
		$('#ans').focus();
		$('.div').append('<button onclick="game()">Отправить</button>');
	}
}

function drawV(elem) {
	let canv = $('#canv');
	if (elem == 1) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 10,
			x1: 20, y1: 450,
			x2: 120, y2: 450
		});
	}
	else if (elem == 2) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 10,
			x1: 60, y1: 450,
			x2: 60, y2: 50
		});
	}
	else if (elem == 3) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 10,
			x1: 55, y1: 50,
			x2: 350, y2: 50
		})
	}
	else if (elem == 4) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 7,
			x1: 330, y1: 50,
			x2: 330, y2: 150
		})
	}
	else if (elem == 5) {
		canv.drawArc({
			strokeStyle: 'black',
			strokeWidth: 8,
			x: 330, y: 180,
			radius: 30
		})
	}
	else if (elem == 6) {
		canv.drawEllipse({
			strokeStyle: 'black',
			strokeWidth: 8,
			x: 330, y: 260,
			width: 60, height: 100
		})
	}
	else if (elem == 7) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 8,
			x1: 310, y1: 220,
			x2 : 270, y2: 260,
			rounded: true
		})
	}
	else if (elem == 8) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 8,
			x1: 350, y1: 220,
			x2 : 390, y2: 260,
			rounded: true
		})
	}
	else if (elem == 9) {
		canv.drawLine({
			strokeStyle: 'black',
			strokeWidth: 8,
			x1: 320, y1: 310,
			x2 : 300, y2: 360,
			rounded: true
		})
	}
}

function lose() {
	let canv = $('#canv');
	canv.drawLine({
		strokeStyle: 'black',
		strokeWidth: 8,
		x1: 340, y1: 310,
		x2 : 360, y2: 360,
		rounded: true
	}).drawLine({
		strokeStyle: '#000',
		strokeWidth: 10,
		rounded: true,
		startArrow: true,
		arrowRadius: 15,
		arrowAngle: 90,
		x1: 400, y1: 150,
		x2: 600, y2: 110
	}).drawText({
		strokeStyle: '#000',
		strokeWidth: 5,
		fromCenter: false,
		x: 620, y: 80,
		fontSize: 48,
		fontFamily: 'Verdana, sans-serif',
		text: name
	})

	$('.div').empty();
}