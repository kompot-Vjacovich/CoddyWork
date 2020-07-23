let f1 = {
	'Название': 'Титаник',
	'Год': 1997,
	'Рейтинг': 8,
	'Режиссёр': 'Джеймс Кемерон',
	'Актёры': ['Леонардо Ди Каприо', 'Кейт Уинслет'],
	'Жанр': 'Мелодрама'
}
let f2 = {
	'Название': 'Джентельмены',
	'Год': 2020,
	'Рейтинг': 8.5,
	'Режиссёр': 'Гай Ричи',
	'Актёры': ['Мэттью МакКонахи', 'Чарли Ханнэм'],
	'Жанр': 'Боевик'
}
// ещё фильмы
let films = [f1, f2]
let option = prompt('1 - посмотреть все фильмы\n2 - вывести фильмы по жанру\n3 - найти фильм по названию');
if(option == '1') {
	// Выводим всю информацию обо всех фильмах
	printFilms(films)
}
else if(option == '2') {
	//ДЗ
	//Добавить ещё один фильм с жанром "боевик"
	let g = prompt('Введите жанр:');
	//Проверка на корректность
	let g_films = [];
	for(let i = 0; i < films.length; i++) {
		if(films[i]['Жанр'] == g) {
		  	g_films.push(films[i])
		}
	}
	// Вывести все фильмы нужного жанра, если такого жанра нет - "Нет фильмов с таким жанром"
	if (g_films.length == 0) {
		alert("Нет фильмов с таким жанром");
	}
	else {
		printFilms(g_films)
	}
  
}
else if(option == '3') {
	let name = prompt('Введите название фильма:');
	//Проверка на корректность
	let name_films = [];
	for(let i = 0; i < films.length; i++) {
		if(films[i]['Название'] == name) {
		  	name_films.push(films[i])
		}
	}
	if (name_films.length == 0) {
		alert("Нет фильмов с таким названием");
	}
	else {
		printFilms(name_films)
	}
}

function printFilms(films_array) {
	for(let i = 0; i < films_array.length; i++) {
		let str = '';
		let f = Object.keys(films_array[i])
		for(let j = 0; j < f.length; j++) {
			let prop = f[j];
			str += prop + ': ' + films_array[i][prop] + '\n';
		}
		alert(str)
	}
}