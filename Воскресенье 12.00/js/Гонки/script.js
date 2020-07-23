let canvas = document.querySelector('#canv');
let canv = canvas.getContext('2d');

// Устанавливаем размер канваса такой же как размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Изменяяем размер канваса, если меняется размер окна
window.onresize = function() {
	let percX, percY;
	if (player) {
		percX = player.x*100/canvas.width;
		percY = player.y*100/canvas.height;
	}	

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	scale = canvas.width/15000;

	if (player) {
		player.x = canvas.width*percX/100;
		player.y = canvas.height*percY/100;
	}
	
	Draw()
}

class Road {
	// Функция, которая выполняется при создании новой дороги
	constructor(image, y) {
		// Координаты текущей дороги
		this.x = 0;
		this.y = y;
		// Проверка загрузки картинки
		this.loaded = false;
		this.image = new Image();
		let road_obj = this;
		this.image.onload = function() {
			road_obj.loaded = true;
		}
		// Текстура текущей дороги
		this.image.src = image;
	}

	Update(road) {
		// Двигаем дорога
		this.y += speed;

		// Когда дорога вышла за границу экрана
		if (this.y > window.innerHeight) {
			this.y = road.y - canvas.height + speed;
		}
	}
}

// Класс машин
class Car {
	// Функция, которая выполняется при создании новой машины
	constructor(image, x, y, isPlayer) {
		this.x = x;
		this.y = y;

		this.image = new Image();
		this.image.src = image;

		this.isPlayer = isPlayer;
	}

	Update() {
		this.y += speed;
		if (this.isPlayer && this.y + this.image.height*scale > canvas.height) {
			this.y = canvas.height - this.image.height*scale;
		}
	}

	Move(dx, dy) {
		// Перемещение по Х
		this.x += speed*dx;
		// Если выходим за границы
		if (this.x + this.image.width*scale > canvas.width) {
			this.x = canvas.width - this.image.width*scale;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// Перемещение по Y
		this.y += speed*dy*boost;
		boost = 1;
		// Если выходим за границы
		if (this.y + this.image.height*scale > canvas.height) {
			this.y = canvas.height - this.image.height*scale;
		}
		if (this.y < 0) {
			this.y = 0;
		}
	}

	Collide(car) {
		let crash = false;

		// Проверяем одинаковое положение по вертикали
		if (this.y < car.y + car.image.height*scale && this.y + this.image.height*scale > car.y) {
			// Проверяем одинаковое положение по горизонтали
			if (this.x < car.x + car.image.width*scale && this.x + this.image.width*scale > car.x) {
				crash = true
			}
		}

		return crash
	}
}

let speed = 5;
let boost = 1;
let roads = [];
roads.push(new Road('img/road.jpg', 0));
roads.push(new Road('img/road.jpg', -canvas.height));

let player;
let scale = canvas.width/15000;
let cars = [];

function update() {
	// Проверка на столкновение
	let crash = false;
	for (let i = 0; i < cars.length; i++) {
		crash = player.Collide(cars[i])
		if (crash) {
			End();
			break
		}
	}

	roads[0].Update(roads[1]);
	roads[1].Update(roads[0]);

	player.Update();

	let dx = 0;
	let dy = 0;

	// Вправо
	if (keys.indexOf(39) != -1) {
		dx = 1;
	}
	// Влево
	if (keys.indexOf(37) != -1) {
		dx = -1;
	}
	// Вперёд
	if (keys.indexOf(38) != -1) {
		dy = -1;
		boost = 2;
	}
	// Назад
	if (keys.indexOf(40) != -1) {
		dy = 1;
	}

	player.Move(dx, dy);

	// Добавление врагов
	if (random(0, 100) > 98) {
		let randIdx = random(0, 3);
		let randImage = 'img/enemy' + randIdx + '.png';
		let randX = random(30, canvas.width - 50);
		let randY = random(300, 400)*-1;
		cars.push(new Car(randImage, randX, randY, false))
	}

	for (let i = 0; i < cars.length; i++) {
		cars[i].Update()
	}

	Draw();
}

function random(min, max) {
	return Math.round(min - 0.5 + Math.random()*(max - min + 1))
}

function Draw() {
	canv.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < 2; i++) {
		canv.drawImage(
			roads[i].image, // Ссылка на картинку
			0, 0, // Координаты верхнего левого угла (координаты картинки)
			roads[i].image.width, roads[i].image.height, // Размеры картинки
			roads[i].x, roads[i].y, // Положение картинки
			canvas.width, canvas.height // Масштабирование картинки под размер канваса
		);
	}

	if (player) {
		// Рисуем машину игрока
		canv.drawImage(
			player.image,
			0, 0,
			player.image.width, player.image.height,
			player.x, player.y,
			// Ширина и высота картинки умноженные на scale
			player.image.width*scale, player.image.height*scale
		);
	}

	// Рисуем врагов
	for (let i = 0; i < cars.length; i++) {
		canv.drawImage(
			cars[i].image,
			0, 0,
			cars[i].image.width, cars[i].image.height,
			cars[i].x, cars[i].y,
			// Ширина и высота картинки умноженные на scale
			player.image.width*scale, player.image.height*scale
		);
	}
}

function control(e) {
	let code = e.keyCode;
	if (keys.indexOf(code) == -1) {
		keys.push(code);
	}
}

let interval;
let keys = [];

function Play() {
	// Удаляю кнопку
	$('#play').remove();
	// Создание машины игрока
	player = new Car('img/car.png', 2*canvas.width/3, canvas.height/2, true);
	// Управление
	window.onkeydown = function(event) {control(event)}
	window.onkeyup = function(e) {
		keys.splice(keys.indexOf(e.keyCode), 1);
	}
	// Запускаю игру
	interval = setInterval(update, 1000/60);
}

function End() {
	clearInterval(interval);
	alert('Ты проиграл!');
	location.reload();
}

window.onload = function() {
	Draw()
}