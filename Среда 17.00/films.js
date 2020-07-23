// Функция, которая ищет фильмы по какому-то параметру
function getFilms(prop, find) {
  let res = []
  // С помощью цикла просматриваем весь массив фильмов
  for (let i = 0; i < films.length; i++) {
    // Если есть фильм с характеристикой prop равной find
    if (films[i][prop] == find) {
      res.push(films[i])
    }
  }
  // Возвращаем то, что нашли
  return res
}

// Функция, которая ищет фильм по параметру (для жанров и актёров)
function getFilms2(prop, find) {
  // Пустой массив для заполнения подходящими фильмами
  let res = []
  // Цикл, проверяем все фильмы, которые у нас есть
  for (let i = 0; i < films.length; i++) {
    // Сохраняем в переменную film массив (с актёрами или жанрами, зависит от prop) текущего фильма
    let film = films[i][prop]
    // Цикл, проверяем каждый жанр (или актёра) в массиве film
    for (let j = 0; j < film.length; j++) {
      // Если этот жанр (или актёр) совпадает с тем что в переменной find (то что спрашивал пользователь)
      if (film[j] == find) {
        // То добавляем весь фильм к массиву res
        console.log(1)
        res.push(films[i])
        break
      }
    }
  }
  // Возвращаем полученный массив
  return res
}

let f = {
  title: 'Начало',
  director: 'Кристофер Нолан',
  year: 2010,
  genre: [ 'фантастика', 'боевик', 'триллер', 'драма', 'детектив'],
  actors: ['Леонардо Ди Каприо', 'Джозеф Гордон-Левитт', 'Эллен Пейдж']
}
// Массив со всеми фильмами
let films = [f]
// Создаём переменную, которая показывает хочет ли пользователь
// ввести ещё один фильм
let n = true
// Цикл, который работает пока пользователь хочет вводить фильмы
while (n == true) {
  let film = {}
  film.title = prompt('Напишите название фильма')
  film.director = prompt('А кто режиссёр этого фильма?')
  film.year = +prompt('В каком году он вышел?')
  // Спрашиваем сколько жанров хочет добавить
  let G = +prompt('К скольки жанрам принадлежит фильм?')
  // Создаём пустой массив жанров
  film.genre = []
  // Пишем цикл, в котором спрашиваем жанр и добавляем в массив
  // столько раз, сколько написал пользователь
  for (let i = 1; i <= G; i++) {
    let g = prompt('Напишите ' + i + '-й жанр')
    film.genre.push(g)
  }

  let A = +prompt("Сколько главных актёров этого фильма Вы помните? (не больше 5)")
  film.actors = []
  for (let i = 1; i <= A && i <= 5; i++) {
    let a = prompt('Напишите ' + i + '-го актёра')
    film.actors.push(a)
  }

  films.push(film)
  n = confirm('Хотите добавить ещё один фильм?')
}

let result = []
let search = prompt('Если хочешь найти фильм по названию - нажми 1, по режиссёру - 2, по году выхода - 3, по жанру - 4, по актёру - 5\nЕсли не хочешь ничего искать нажми Отмена.');
if (search == 1) {
  let p = prompt('Введи название фильма')
  result = getFilms('title', p)
}
else if (search == 2) {
  let p = prompt('Введи режиссёра фильма')
  result = getFilms('director', p)
}
else if (search == 3) {
  let p = prompt('Введи год выхода фильма')
  result = getFilms('year', p)
}
else if (search == 4) {
  let p = prompt('Введи жанр фильма')
  result = getFilms2('genre', p)
}
else if (search == 5) {
  let p = prompt('Введи актёра фильма')
  result = getFilms2('actors', p)
}



for (let i = 0; i < result.length; i++) {
  let t = 'Название: ' + result[i].title + '\n'
  let d = 'Режиссёр: ' + result[i].director + '\n'
  let y = 'Год выхода: ' + result[i].year + '\n'
  let g = 'Жанры: ' + result[i].genre.join(', ') + '\n'
  let a = 'Актёры: ' + result[i].actors.join(', ') + '\n'

  alert(t + d + y + g + a);
}