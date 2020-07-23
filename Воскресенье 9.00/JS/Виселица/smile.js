//Функция, которая выбирает случайное слово из 
//массива words, и возвращает его
function randomWord(words) {
	return words[Math.floor(Math.random()*words.length)]
}

//Если переменная name равна null, то есть пользователь не ввёл имя, то
//данная функция возвращает случайное имя из массива names,
//иначе возвращает то же самое имя, которое в эту функцию передали
function setName(smile) {
	if(smile == null || smile == "") {
		let smiles = ["^-^", "-^.^-", "-_-"];
		return randomWord(smiles)
	}

	return smile
}

//Функция, которая N-раз рисует smile
function game(N, smile) {
	let stroka = '';
	while(N--) {
		//добавляем к строке smile и перевод на новую строку('\n')
		stroka = stroka + '\n' + smile;
	}
	//выводим строку
	alert(stroka);
}

function Smile() {
	//Спрашиваем смайл
	let smile = prompt("Введите смайл, который хотите нарисовать...");
	//Проверяем ввёл ли пользователь смайл, если нет - то ставим свой смайл
	smile = setName(smile);
	//Спрашиваем количество смайлов и записываем в переменную N
	let N = prompt("Хорошо. А сколько раз ты хочешь его нарисовать?");
	//Вызываем функцию game(N, smile)
	game(N, smile);
}