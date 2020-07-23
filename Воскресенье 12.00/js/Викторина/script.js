let data = [
	{quest: "Назовите столицу Италии", ans: "рим"},
	{quest: "Назовите самую длинную реку в Африке", ans: "нил"},
	{quest: "Сколько штатов в США?", ans: "50"},
	{quest: "Сколько континентов на планете земля?", ans: "6"},
	{quest: "Какая страна самая большая по площади?", ans: "россия"}
];

let score = 0;
let name = "";
const len = data.length;

function question() {
	$('#info').append('<h1>'+ data[0].quest +'</h1>');
	$('#info').append('<input type="text" id="answer" autofocus="true"><input type="submit" onclick="check()">');
}

function check() {
	// Проверяем ответ
	let answer = $('#answer').val().toLowerCase();
	if(answer == data[0].ans) {
		score++;
	}
	// Удаляем использованный вопрос
	data.shift()
	// Удаляем вопрос и поле
	$('#info').empty();
	if (data.length != 0) {
		// Выводим новый вопрос
		question();
	}
	else theEnd();
	
}

function theEnd() {
	$('#info').append('<h1>'+ name +', ты набрал '+ score +'/'+ len +' очков!');
}

function start() {
	// Получаем и устанавливаем имя
	name = $('#name').val();
	if(name == '') name = 'Инкогнито';

	// Удалить всё со страницы
	$('#info').empty();

	// Запускаем функцию с вопросами
	question();
}