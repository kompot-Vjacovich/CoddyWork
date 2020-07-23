let firstAns = 4;
let timer;
window.onload = function() {
	let t = 60;
	timer = setInterval(function() {
		$('#h').text(t);
		t--;
		if (t < 0) {
			clearInterval(timer)
			// Сообщить о поражении
		}
	}, 1000)
}

// Функция, проверяет ответы и меняет вопросы
let answer = 4;
// Номер примера
let N = 0;
// Количество правильных ответов
let mark = 0;

function calc() {
	let ans = +$('#ans').val();
	if (answer == ans) {
		mark++;
	}
	N++;
	if (N == 10) {
		// Стираем всё и выводим результат
		clearInterval(timer)
		return false;
	}

	let a = getRand();
	let b = getRand();
	answer = a+b;

	$('#first').text(a);
	$('#second').text(b);
	$('#ans').val('').focus()
}

function getRand() {
	return Math.floor(Math.random()*100)
}