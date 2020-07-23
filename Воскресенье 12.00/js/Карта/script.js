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
	let pos = 5 - P_cards.length;
	for (let i = 0, j = pos; i < P_cards.length; i++, j++) {
		P_cards[i].resize(j, cardW, canvas.height-cardW*1.5);
		NPC_cards[i].resize(j, cardW, 0);
	}
	Draw()
}

// Выдвижение карт
canvas.onmousemove = function(e) {
	let cardW = canvas.width/10;
	let pos = 5 - P_cards.length;
	for (let i = 0, j = pos; i < P_cards.length; i++, j++) {
		if (onCard(i, e.clientX, e.clientY)) {
			P_cards[i].resize(j, cardW, canvas.height-cardW*1.875);
		}
		else {
			P_cards[i].resize(j, cardW, canvas.height-cardW*1.5);
		}
	}
}

// Выбор карты. Ход.
canvas.onclick = function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let cardW = canvas.width/10;
	for (let i = 0; i < P_cards.length; i++) {
		let isClicked = onCard(i, e.clientX, e.clientY);
		if (isClicked) {
			// Карта игрока
			move[0] = new Card(P_cards[i].image.src, P_cards[i].DAM, P_cards[i].HP);
			// Карта противника
			let rand = Math.floor(Math.random() * P_cards.length);
			move[1] = new Card(NPC_cards[rand].image.src, NPC_cards[rand].DAM, NPC_cards[rand].HP);
			// Удаление карт из "рук" игроков
			P_cards.splice(i, 1);
			NPC_cards.splice(rand, 1)
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
				// Концовка
				if (P_cards.length == 0) {
					// Вызываем функцию наполнения массивов
				}
				// Финал
				if (P_HP <= 0 || NPC_HP <= 0) {
					clearInterval(interval);
					canv.clearRect(0, 0, canvas.width, canvas.height);
					theEnd();
				}
			}, 2000);
			break
		}
	}

	// Смещение карт
	let pos = 5 - P_cards.length
	for (let i = 0, j = pos; i < P_cards.length; i++, j++) {
		P_cards[i].resize(j, cardW, canvas.height-cardW*1.5);
		NPC_cards[i].resize(j, cardW, 0);
	}
}

// Класс карт
class Card {
	// Функция, которая создаёт новую карту
	constructor(img, attack, health) {
		// Задаём карте её характеристики
		this.image = new Image();
		this.image.src = img;

		this.DAM = attack;
		this.HP = health;

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

let P_HP = 50;
let NPC_HP = 50;
let move = [];

// Создаём колоду
const deck = [
	// Вальты
	{img: 'cards/1.png', DAM: 1, HP: 1}, {img: 'cards/2.png', DAM: 1, HP: 2},
	{img: 'cards/3.png', DAM: 1, HP: 3}, {img: 'cards/4.png', DAM: 1, HP: 4},
	// Дамы
	{img: 'cards/5.png', DAM: 2, HP: 2}, {img: 'cards/6.png', DAM: 2, HP: 3},
	{img: 'cards/7.png', DAM: 2, HP: 4}, {img: 'cards/8.png', DAM: 2, HP: 5},
	// Короли
	{img: 'cards/9.png', DAM: 3, HP: 2}, {img: 'cards/10.png', DAM: 4, HP: 2},
	{img: 'cards/11.png', DAM: 4, HP: 2}, {img: 'cards/12.png', DAM: 5, HP: 2},
	// Тузы
	{img: 'cards/13.png', DAM: 3, HP: 3}, {img: 'cards/14.png', DAM: 4, HP: 4},
	{img: 'cards/15.png', DAM: 5, HP: 5}, {img: 'cards/2.png', DAM: 6, HP: 6}
];

// Создание колоды игрока
let P_cards = [];
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*deck.length);
	P_cards.push(new Card(deck[rand].img, deck[rand].DAM, deck[rand].HP));
	// Задаём размер и положение карты
	let cardW = canvas.width/10;
	P_cards[i].resize(i, cardW, canvas.height-cardW*1.5);
}

// Создание колоды противника
let NPC_cards = [];
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*deck.length);
	NPC_cards.push(new Card(deck[rand].img, deck[rand].DAM, deck[rand].HP));
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
	$('#npc').text(NPC_HP)
	$('#player').text(P_HP)
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
// Первая карта - игрок, вторая - противник
function check(dam1, hp1, dam2, hp2) {
	// Первый игрок атакует второго
	let attack1 = hp2 - dam1;
	// Второй игрок атакует первого
	let attack2 = hp1 - dam2;

	// Если уроны были больше чем жизни, то нужно отнять остаток от жизней ИГРОКОВ
	if (attack1 < 0) {
		NPC_HP += attack1;
	}
	if (attack2 < 0) {
		P_HP += attack2;
	}
}

let interval;
window.onload = function() {
	interval = setInterval(Draw, 1000/60)
}