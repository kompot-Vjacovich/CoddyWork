function mapGen(w, h, steps, complete, time) {
	// функция отрисовки персонажа
	function player(dx, dy) {
		// получаем цвет пикселя из промежутка между ячейкой
		// в которой стоит персонаж, и той, в которой он передвигается
		let pixel = ctx.getImageData(13*x + 7 + 6*dx, 13*y + 7 + 6*dy, 1, 1)
		let r = pixel.data[0];
		let g = pixel.data[1];
		let b = pixel.data[2];
		let alpha = pixel.data[3];
		// Если черный цвет, то не двигаемся 
		if (r == 0 && g == 0 && b == 0 && alpha == 255) {
			dx = 0;
			dy = 0;
		}
		else {
			// Увеличиваем количество шагов на единицу
			steps++;
			$("#steps").text(steps);
		}
		// Закрашиваем персонажа (его прошлое положение)
		ctx.clearRect(13*x + 3, 13*y + 3, 10 , 10);
		// меняем координаты
		x += dx; // x = x + dx
		y += dy; // y = y + dy
		// Отрисовываем персонажа
		ctx.fillRect(13*x + 3, 13*y + 3, 10 , 10/*ДЗ*/)
		if (x >= w) {
			$("#complete").text(complete++);
			// ДЗ ДЗ ДЗ ДЗ ДЗ
			if (w >= 100 || h >= 100) {
				//Когда ширина 100, убираем все и выводим поздравления
			}
			else {
				clearInterval(timerId)
				mapGen(w+5, h+5, 0, complete++, (w+h+10)*1.5);
			}
		}
	}

	let canv = document.getElementById("canv"); //тоже самое что и $("#canv")
	let ctx = canv.getContext("2d");
	// выписываем количество пройденых шагов и лабиринтов
	$("#steps").text(Math.floor(steps));
	$("#complete").text(Math.floor(complete));
	// задаем ширину и высоту лабиринта
	canv.width = 13*w + 3;
	canv.height = 13*h + 3;
	// Закрашиваем все в черный цвет
	ctx.fillStyle = "black";
	// fillRect(x-лев.верхний угла , у лев.верхнего угла ширина, высота )
	ctx.fillRect(0, 0, 13*w+3 , 13*h+3);

// Генерация лабиринта 
	// объявляем массивы для хранения значения множества текущей ячейки,
	// для хранения стенки справа и для хранения стенки снизу
	let column = Array(w);
	let right = Array(w);
	let bottom = Array(w);
	// Текущее множество (quantity)
	let quan = 1;
	// Цикл по строкам
	for (let str = 0; str < h; str++) {
		// Проверяем пренадлежность ячейки множеству
		for (let stolb = 0; stolb < w; stolb++) {
			if (str == 0) {
				column[stolb] = 0;
			}
			ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 10);
			bottom[stolb] = 0;
			// Если справа стена, то убираем и указываем, что из этщй ячейки есть выход 
			if (right[stolb] == 1) {
				right[stolb] = 0;
				column[stolb] = 0;
			}
			if (column[stolb] == 0) {
				column[stolb] = quan++;
			}
		}
		// рандомно убираем стенки справа и снизу
		for (let stolb = 0; stolb < w; stolb++) {
			bottom[stolb] = Math.floor(Math.random()*2);
			right[stolb] = Math.floor(Math.random()*2);
			// Убираем нижние стенки 
			if (str != h-1 && right[stolb] == 0) {
				ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 15)
			}
			// Убираем стенки справа 
			if (stolb != w-1 && column[stolb + 1] != column[stolb] && (bottom[stolb] == 0 || str != h-1 )) {
				let l = column[stolb+1];
				for (let j = 0; j < w; j++) {
					if (column[j] == l) {
						column[j] = column[stolb];
					}
				}
				ctx.clearRect(13*stolb + 3, 13*str + 3, 15, 10)
			}
		}
		// Проверка на зумнкнутые области
		for (let stolb = 0; stolb < w; stolb++) {
			let p = 0, l = 0;
			for (let j = 0; j < w; j++) {
				if (column[j] == column[j] && right[j]) {
					p++;
				}
				else {
					l++;
				}
			}
			if (p == 0) {
				right[j] = 0;
				ctx.clearRect(13*stolb + 3, 13*str + 3, 15, 10);
			}
		}
	}
	


// делаем выход из лабиринта 

ctx.clearRect(13*w,13*Math.floor(Math.random()*h) + 3, 15, 10);
//Начальные координаты персонажа
	let x = 0, y = 0;
	// Устанавливаем цвет персонажа 
	ctx.fillStyle = "red";
	// Рисуем персонажа в начальном положении
	player(-1, -1);
// обробатываем нажатие на кнопки 
	window.onkeydown = function(event) {
		// Вправо
		if (event.keyCode == 68) {
			player(1, 0);
		}
		// Налево
		if (event.keyCode == 65) {
			player(-1, 0);
		}
		// Вверх
		if (event.keyCode == 87) {
			player(0, -1);
		}
		// Вниз
		if (event.keyCode == 83) {
			player(0, 1);
		}
	}

	// Таймер
	$('#time').text(time)
	let timerId = setInterval(function() {
		let oldTime = +$('#time').text()
		if (oldTime == 0) {
			// Запускаем этот же лабиринт заново
			mapGen(w, h, 0, complete, time);
			clearInterval(timerId)
		}
		else {
			let newTime = oldTime - 1;
			$('#time').text(newTime)
		}
	}, 1000)


}

function play() {
	let width = +$('#width').val()
	let height = +$('#height').val()
	$('.menu').remove()

	let gameStr = '<div class="stat">Шагов: <span id="steps">0</span> пройдено лабиринтов: <span id="complete"></span> Время: <span id="time"></span></div><canvas id="canv" style="background-color: #eee"></canvas>';
	$('body').append(gameStr)

	mapGen(width, height, 0, 0, (width+height)*1.5);
}