// const deck = [
// 	{img: 'cards/1.png', DAM :5, HP :5,},{img: 'cards/9.png', DAM :2, HP :5,},
//  	{img: 'cards/2.png', DAM :0, HP :0,},{img: 'cards/10.png', DAM :1, HP :5,},
// 	{img: 'cards/3.png', DAM :0, HP :0,},{img: 'cards/11.png', DAM :0, HP :0,},
//  	{img: 'cards/4.png', DAM :12, HP :13,},{img: 'cards/12.png', DAM :0, HP :5,},
//  	{img: 'cards/5.png', DAM :5, HP :5,},{img: 'cards/13.png', DAM :10, HP :10,},
//  	{img: 'cards/6.png', DAM :15, HP :1,},{img: 'cards/14.png', DAM :1, HP :1,},
//  	{img: 'cards/7.png', DAM :4, HP :12,},{img: 'cards/15.png', DAM :3, HP :13,},
//  	{img: 'cards/8.png', DAM :0, HP :1,}
//  ];
let canvas = document.querySelector('#canv');
let canv = canvas.getContext('2d');

// Устанавливаем размер канваса такой же как размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Изменение размера канваса, если меняется размер окна
window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	// Меняем размер и положение карт
	let cardW = canvas.width/10;
	for (let i = 0; i < P_cards.length; i++) {
		P_cards[i].resize(i, cardW, canvas.height-cardW*1.5);
		NPC_cards[i].resize(i, cardW, 0);
	}
	Draw()
}

// Выдвижение карт
canvas.onmousemove = function(e) {
	let cardW = canvas.width/10;
	for (let i = 0; i < P_cards.length; i++) {
		if (onCard(i, e.clientX, e.clientY)) {
			P_cards[i].resize(i, cardW, canvas.height-cardW*2);
		}
		else {
			P_cards[i].resize(i, cardW, canvas.height-cardW*1.5);
		}
	}
}

canvas.onclick = function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let cardW = canvas.width/10;
	for (let i = 0; i < P_cards.length; i++) {
		let isClicked = onCard(i, e.clientX, e.clientY);
		if (isClicked) {
			move.push(P_cards[i]);
			let rand = Math.floor(Math.random()*P_cards.length);
			move.push(NPC_cards[rand])
			// Удаление карт из "рук" игроков
			P_cards.splice(i, 1);
			NPC_cards.splice(rand, 1);
			// Запрещаем нажимать на canvas
			$('#canv').css('pointer-events', 'none');
			// Перемещаем карты в центр
			move[0].resize(3, cardW, (canvas.height - cardW*1.5)/2);
			move[1].resize(1, cardW, (canvas.height - cardW*1.5)/2);
			// Добавляем очки и убираем карты
			setTimeout(function() {
				// Смотрим кто выиграл и обновляем жизни игроков
				check(move[0].DAM, move[0].HP, move[1].DAM, move[1].HP);
				// Удаляем карты хода
				move = [];
				$('#canv').css('pointer-events', 'auto');
				// Финал
				if (Players[0] <= 0 || Players[1] <= 0) {
					clearInterval(interval);
					canv.clearRect(0, 0, canvas.width, canvas.height);
					// theEnd();
				}
				// Концовка
				else if (P_cards.length == 0 || NPC_cards.length == 0) {
					// Вызываем функцию наполнения массивов
				}
			}, 2000);
			break
		}
	}
}

// Класс карт
class Card {
	// Функция, которая создаёт новую карту
	constructor(img, attack, health, special) {
		// Задаём карте её характеристики
		this.image = new Image();
		this.image.src = img;

		this.DAM = attack;
		this.HP = health;
		this.special = special;

		// Координаты карты
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.heigth = 0;

		// Рубашка карты
		this.back = new Image();
		this.back.src = 'cards/666.png';
	}

	resize(i, cardW, y) {
		this.width = cardW;
		this.height = cardW*1.5;
		this.x = (i+2)*cardW + i*cardW/4;
		this.y = y;
	}
}

let Players = [{HP: 50, card: false}, {HP: 50, card: false}];
let move = [];

// Создаём колоду
const deck = [
 	{img: "cards/Воин.png", DAM: 4, HP: 12, special: false}, {img: "cards/Копьё.png", DAM: 5, HP: 5, special: false},
 	{img: "cards/Ледяная сила.png", DAM: 0, HP: 0, special: "freeze"}, {img: "cards/Пустота.png", DAM: 0, HP: 0, special: false},
 	{img: "cards/Рыцарь.png", DAM: 12, HP: 13, special: false}, {img: "cards/Солдат.png", DAM: 5, HP: 5, special: "extraDAM"},
 	{img: "cards/Школьник.png", DAM: 15, HP: 1, special: false}, {img: "cards/Рыцарь.png", DAM: 12, HP: 13, special: false},
 	{img: "cards/Дух.png", DAM: 0, HP: 1, special: "freeze"}, {img: "cards/Маг.png", DAM: 6, HP: 5, special: false},
 	{img: "cards/Медик.png", DAM: 0, HP: 5, special: "HP+"}, {img: "cards/Оживитель.png", DAM: 0, HP: 0, special: "card+"},
 	{img: "cards/Помощник.png", DAM: 0, HP: 5, special: "mag+"}, {img: "cards/Что-то.png", DAM: 10, HP: 10, special: false},
 	{img: "cards/Шар с огоньком.png", DAM: 5, HP: 1, special: false}, {img: "cards/Орг.png", DAM: 3, HP: 15, special: false}
 ];

// Создание колоды игрока
let P_cards = [];
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*deck.length);
	P_cards.push(new Card(deck[rand].img, deck[rand].DAM, deck[rand].HP, deck[rand].special));
	// Задаём размер и положение карты
	let cardW = canvas.width/10;
	P_cards[i].resize(i, cardW, canvas.height-cardW*1.5);
}

// Создание колоды противника
let NPC_cards = [];
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*deck.length);
	NPC_cards.push(new Card(deck[rand].img, deck[rand].DAM, deck[rand].HP, deck[rand].special));
	// Задаём размер и положение карты
	let cardW = canvas.width/10;
	NPC_cards[i].resize(i, cardW, 0);
}

// Функция отрисовки игрового поля
function Draw() {
	canv.clearRect(0, 0, canvas.width, canvas.height)

	for (let i = 0; i < P_cards.length; i++) {
		// Отрисовка колоды игрока
		canv.drawImage(
			P_cards[i].image, // Картинка
			0, 0, // Координаты лев. верх. угла вырезаемого куска картинки
			P_cards[i].image.width, P_cards[i].image.height, // Размеры вырезаемого куска
			P_cards[i].x, P_cards[i].y, // Координаты вырезанного изображения на холсте
			P_cards[i].width, P_cards[i].height //Размер картинки на холсте
		);

		// Отрисовка колоды противника
		canv.drawImage(
			NPC_cards[i].back, // Картинка
			0, 0, // Координаты лев. верх. угла вырезаемого куска картинки
			NPC_cards[i].back.width, NPC_cards[i].back.height, // Размеры вырезаемого куска
			NPC_cards[i].x, NPC_cards[i].y, // Координаты вырезанного изображения на холсте
			NPC_cards[i].width, NPC_cards[i].height //Размер картинки на холсте
		);
	}

	for (let i = 0; i < move.length; i++) {
		canv.drawImage(
			move[i].image, // Картинка
			0, 0, // Координаты лев. верх. угла вырезаемого куска картинки
			move[i].image.width, move[i].image.height, // Размеры вырезаемого куска
			move[i].x, move[i].y, // Координаты вырезанного изображения на холсте
			move[i].width, move[i].height //Размер картинки на холсте
		);
	}

	// Обновление жизней
	$('#npc').text(Players[0].HP)
	$('#player').text(Players[1].HP)
}

// Находится ли курсор на i-й карте
function onCard(i, x, y) {
	let right = x > P_cards[i].x;
	let left = x < P_cards[i].x + P_cards[i].width;
	let down = y > P_cards[i].y;
	let up = y < P_cards[i].y + P_cards[i].height;

	if (right && left && up && down) {
		return true
	}
	else return false
}

// Сравнение карт
function check(moveArr) {
	for (let i = 0; i < moveArr.length; i++) {
		let idx = 1 - i;
		if (moveArr[i].special) {
			let sp = moveArr[i].special
			if (sp == "freeze") {
				moveArr[idx].DAM = 0;
			}
			else if (sp == "extraDAM" && moveArr[idx].image.src == "cards/Школьник.png") {
				moveArr[i].HP += 15;
			}
			else if (sp == "HP+") {
				Players[i].HP += 10;
			}
			else if (sp == "card+") {
				let rand = Math.floor(Math.random()*deck.length);
				Players[i].card = new Card(deck[rand].img, deck[rand].DAM, deck[rand].HP, deck[rand].special);
			}
			else if (sp == "mag+") {
				Players[i].card = new Card(deck[10].img, deck[10].DAM, deck[10].HP, deck[10].special);
			}
		}

		let hp = moveArr[i].HP - moveArr[idx].DAM;
		if (hp < 0) {
			Players[i] += hp;
		}
	}
}

let interval;
window.onload = function() {
	interval = setInterval(Draw, 1000/60)
}