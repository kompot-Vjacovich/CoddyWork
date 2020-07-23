// Когда загрузится документ
window.onload = function() {
    // Находим холст
    let canvas = $('#canvas');

    // Создаём переменные x и у для
    // хранения положения персонажа
    let coord_x = 0;
    let coord_y = 0;
    // Создаём переменную timer для
    // перерисовки холста
    let timer;

    // Запускаем функцию отрисовки лабиринта
    // с указанием изображения лабиринта и 
    // начальных координат персонажа
    drawMaze("maze.jpg", 360, 15);

    // Отслеживаем нажатие клавиш
    // Если какая-то нажата, то запускаем функцию checkKey
    window.onkeydown = checkKey;

    // Функция для отрисовки лабиринта
    function drawMaze(mazeFile, startingX, startingY) {
        // Остановить таймер, если он запущен
        clearTimeout(timer)
        // Остановить перемещение персонажа
        dx = 0;
        dy = 0;

        // Загружаем изображения лабиринта
        let imgMaze = new Image();
        // Когда картинка загрузится
        imgMaze.onload = function() {
            // Изменяем размер холста в соответствии
            // с размером лабиринта
            canvas.attr('width', imgMaze.width);
            canvas.attr('height', imgMaze.height);

            // Рисуем лабиринт
            canvas.drawImage({
                source: imgMaze,
                fromCenter: false,
                x: 0, y: 0
            });

            // Устанавливаем координаты персонажу
            coord_x = startingX;
            coord_y = startingY;

            // Рисуем персонажа
            canvas.drawImage({
                source: $('#face').attr('src'),
                // Рисуем в начальном положении
                x: coord_x,
                y: coord_y,
                // Размеры персонажа
                width: 20, height: 20
            });

            // Рисуем следующий кадр
            // через каждые 10 миллисекунд
            timer = setTimeout(drawFrame, 10);
        }
        // Устанавливаем ссылку на картинку лабиринта
        imgMaze.src = mazeFile;
    }

    // Функция, которая обрабатывает нажатие клавиш
    function checkKey(e) {
        // Если персонаж находится в движении,
        // то останавливаем его
        dx = 0;
        dy = 0;

        // Если клавиша W нажата, значит идём вверх
        if (e.keyCode == 87) {
            dy = -1;
        }
        // Если клавиша S нажата, значит идём вниз
        if (e.keyCode == 83) {
            dy = 1;
        }
        // Если клавиша A нажата, значит идём влево
        if (e.keyCode == 65) {
            dx = -1;
        }
        // Если клавиша D нажата, значит идём вправо
        if (e.keyCode == 68) {
            dx = 1;
        }
    }

    // Функция, которая перерисовывает лабиринт
    function drawFrame() {
        // Обновляем кадр, но только, если персонаж движется
        if (dx != 0 || dy != 0) {
            // Закрашиваем перемещение персонажа
            canvas.drawRect({
                fillStyle: 'yellow',
                x: coord_x, y: coord_y,
                // Размеры персонажа
                width: 20, height: 20
            });

            // Обновляем координаты
            coord_x += dx;
            coord_y += dy;

            // Проверка столкновения со стенками лабиринта
            // ДОПИСАТЬ

            // Перерисовываем персонажа
            canvas.drawImage({
                source: $('#face').attr('src'),
                // Рисуем в начальном положении
                x: coord_x,
                y: coord_y,
                // Размеры персонажа
                width: 20, height: 20 
            });

            // Проверяем дошёл ли до финиша
            // ДОДЕЛАТЬ
        }

        timer = setTimeout(drawFrame, 10);
    }
}