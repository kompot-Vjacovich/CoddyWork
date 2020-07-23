function mapGen(w, h, steps, complete, time) {
	// Функция отрисовки персонажа
	function player(dx, dy) {
		// Получаем цвет пикселя из промежутка между той ячейкой,
		// в которой стоит персонаж, и той, в сторону которой он передвигается.
		let pixel = ctx.getImageData(13*x+7+6*dx, 13*y+7+6*dy, 1, 1);
		let r = pixel.data[0];
		let g = pixel.data[1];
		let b = pixel.data[2];
		let alpha = pixel.data[3];
		// Если чёрный цвет, то не двигаемся
		if (r == 0 && g == 0 && b == 0 && alpha == 255) {
			dx = 0;
			dy = 0;
		}
		else {
			// Увеличиваем количество шагов на единицу
			steps++;
			$('#steps').text(steps);
		}
		// Закрашиваем персонажа
		ctx.clearRect(13*x + 3, 13*y + 3, 10, 10);
		// Меняем координаты
		x += dx; //x = x + dx
		y += dy; //y = y + dy
		// Отрисовываем персонажа
		ctx.fillRect(13*x + 3, 13*y + 3, 10, 10)
		if (x >= w) {
			$('#complete').text(complete++)
			// ДЗ
			if (w > 100) {
				$('body').empty()
			}
			else {
				clearInterval(timerID)
				mapGen(w+5, h+5, 0, complete, (w+h+10)*1.5);
			}
		}
	}
	let canv = document.querySelector('#canv'); // то же самое, что и $('#canv')
	let ctx = canv.getContext('2d');
	// Выписываем количество пройденных шагов и лабиринтов
	$('#steps').text(Math.floor(steps));
	$('#complete').text(Math.floor(complete));
	// Задаём ширину и высоту лабиринта
	canv.width = 13*w + 3;
	canv.height = 13*h + 3;
	// Закрашиваем всё в чёрный цвет
	ctx.fillStyle = 'black';
	// fillRect(х-лев.верх. угла, у-лев.верх. угла, ширина, высота)
	ctx.fillRect(0, 0, 13*w+3, 13*h+3);

	// Генерация лабиринта
	// Объявляем массивы для хранения значения множества текущей ячейки,
	// для хранения стенки справа и для хранения стенки снизу
	let column = Array(w);
	let right = Array(w);
	let bottom = Array(w);
	// Текущее множество (quantity)
	let quan = 1;
	// Цикл по строкам
	for (let str = 0; str < h; str++) {
		// Проверяем принадлежность ячейки множеству
		// Создание клеточек
		for (let stolb = 0; stolb < w; stolb++) {
			if (str == 0) {
				column[stolb] = 0;
			}
			ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 10);
			bottom[stolb] = 0;
			// Если справа стена, то убираем и указываем, что из этой ячейки есть выход
			if (right[stolb] == 1) {
				right[stolb] = 0;
				column[stolb] = 0;
			}
			if (column[stolb] == 0) {
				column[stolb] = quan++;
			}
		}
		// Рандомно убираем стенки справа и снизу
		for (let stolb = 0; stolb < w; stolb++) {
			bottom[stolb] = Math.floor(Math.random()*2);
			right[stolb] = Math.floor(Math.random()*2);
			// Убираем нижние стенки
			if (str != h-1 && right[stolb] == 0) {
				ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 15)
			}
			// Убираем стенки справа
			if (stolb != w-1 && column[stolb+1] != column[stolb] && (bottom[stolb] == 0 || str == h-1)) {
				let l = column[stolb+1];
				for (let j = 0; j < w; j++) {
					if (column[j] == l) {
						column[j] = column[stolb];
					}
				}
				ctx.clearRect(13*stolb + 3, 13*str + 3, 15, 10)
			}
		}
		// Проверка на замкнутые области
		for (let stolb = 0; stolb < w; stolb++) {
			let p = 0, l = 0;
			for (let j = 0; j < w; j++) {
				if (column[stolb] == column[j] && right[j] == 0) {
					p++;
				}
				else {
					l++;
				}
			}
			if (p == 0) {
				right[stolb] = 0;
				ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 15);
			}
		}
	}

	// Делаем выход из лабиринта
	ctx.clearRect(13*w, 13*Math.floor(Math.random()*h) + 3, 15, 10)
	// Начальные координаты персонажа
	let x = 0, y = 0;
	// Устанавливаем цвет персонажа
	ctx.fillStyle = 'red';
	// Рисуем персонажа в начальном положении
	player(-1, -1);
	// Обрабатываем нажатия на кнопки
	window.onkeydown = function(event) {
		// Вправо
		if (event.keyCode == 39) {
			player(1, 0);
		}
		// Налево
		if (event.keyCode == 37) {
			player(-1, 0);
		}
		// Вверх
		if (event.keyCode == 38) {
			player(0, -1);
		}
		// Вниз
		if (event.keyCode == 40) {
			player(0, 1);
		}
	}

	// Таймер
	$('#time').text(time)
	let timerID = setInterval(function() {
		// Узнаём текущее время
		let oldTime = +$('#time').text();
		// Если время равно 0
		if (oldTime == 0) {
			// Запускаем этот же лабиринт заново
			mapGen(w, h, 0, complete, time);
			// Удаляем текущий таймер
			clearInterval(timerID)
		}
		else {
			// Уменьшаем время на 1
			let newTime = oldTime - 1;
			// Выводим новое время
			$('#time').text(newTime)
		}
	}, 1000);
}

function play() {
	let width = +$('#width').val()
	let height = +$('#height').val()
	$('body').empty();
	let startGame = '<div class="stat">Шагов: <span id="steps">0</span>   Пройдено лабиринтов: <span id="complete">0</span>  Время: <span id="time"></span></div><canvas id="canv" style="background-color: #eee"></canvas>';
	$('body').append(startGame);
	mapGen(width, height, 0, 0, (width+height)*1.5);
}