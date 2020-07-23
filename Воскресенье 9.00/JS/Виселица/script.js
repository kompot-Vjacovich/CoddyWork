//Функция, которая выбирает случайное слово из 
//массива words, и возвращает его
function randomWord(words) {
	return words[Math.floor(Math.random()*words.length)]
}

//Если переменная name равна null, то есть пользователь не ввёл имя, то
//данная функция возвращает случайное имя из массива names,
//иначе возвращает то же самое имя, которое в эту функцию передали
function setName() {
	let name = $('#name').val()
	if(name == null || name == "") {
		const names = ["Бальтозавр", "Святополк", "Родомир", "Афанасий"];
		return randomWord(names)
	}
	$('#names').remove();

	return name
}

// Функция, которая спрашивает имя
function getName() {
	$('body').append('<div id="names"><p>Введите своё имя...</p><input type="text" id="name"><input type="submit" id="button" onclick="setName()"></div>');
	$('#play').remove();
	$('#smile').remove();
}

//Функция, которая загадывает случайное слово из массива slova
function chooseWord() {
	const slova = ["макака", "компьютер", "глобус", "телефон", "школа"];
	return randomWord(slova)
}

//Функция, которая обновляет счёт
function updateScore(name, otvetMassiv, ostalosBukv, popytki) {
	alert(name + ", ваше слово - " + otvetMassiv.join(" ") + " Осталось " + ostalosBukv + " букв(ы). И " + popytki + " попыток.")
}

//Функция, которая выводит сообщение о победе
function win(name, slovo) {
	alert(name + ", ты победил. Поздравляю! Мы загадывали - " + slovo)
}

//Функция, которая выводит сообщение о проигрыше
function lose(name, slovo) {
	alert(name + ", ты проиграл. Мы загадывали - " + slovo)
}


function Viselitsa() {
	getName();
	const name = setName();

	const slovo = chooseWord();

	let otvetMassiv = [];
	for (let i = 0; i < slovo.length; i++) {
		otvetMassiv[i] = "_";
	}

	let ostalosBukv = slovo.length;
	let popytki = slovo.length - 2;

	while(popytki > 0 && ostalosBukv > 0) {
		updateScore(name, otvetMassiv, ostalosBukv, popytki);
		let bukva = prompt("Введите букву...");
		bukva = bukva.toLowerCase();
		let ugadal = false;

		for(let i = 0; i < slovo.length; i++) {
			if(slovo[i] == bukva) {
				otvetMassiv[i] = bukva;
				ostalosBukv--;
				ugadal = true;
			}
		}
		if (ugadal == false) popytki--
	}
	
	if (popytki == 0) lose(name, slovo)
	else win(name, slovo)
}