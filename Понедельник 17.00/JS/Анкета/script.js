function main() {
	// Получаем данные из формы
	let s_name = $("#s_name").val();
	let name = $("#name").val();
	let f_name = $("#f_name").val();
	let phone = $("#phone").val();
	let email = $("#email").val();

	let date = $("#date").val()
	let age = getAge(date)
	// Проверка если возраст == -1
	if (age < 0) age = 0;
	
	let genderId = $('input[name="gender"]:checked')[0].id
	let gender = $('label[for="'+genderId+'"]').text()

	let city = $('#city>option:selected').text()
	if (city == 'Выберете Ваш город') city = 'Неизвестный';

	let about = $('#about').val()

	let lang = getLang()
	let images = ''
	if (lang.length > 0) {
		images = getLogo(lang)
	}

	let pictureLink = $('#picture').attr('src');
	let color = $('#color').val()

	// Вывод данных
	// Удаляем форму
	$('form').remove()
	// Выводим личное дело
	$('body').append('<main class="main">')
	let main = $('.main')
	main.append('<img id="face" src="'+pictureLink+'">')
	$('#face').css('border-color', color);
	makeDivs(main, "Фамилия", s_name)
	makeDivs(main, "Имя", name)
	if(f_name) makeDivs(main, "Отчество", f_name)
	makeDivs(main, "Телефон", phone)
	makeDivs(main, "Email", email)
	makeDivs(main, "Возраст", age)
	makeDivs(main, "Пол", gender)
	makeDivs(main, "Город", city)
	if(about) makeDivs(main, "Подробнее", about)
	if (images.length > 0) main.append('<div class="line">'+images+'</div>')
}

function readURL(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = function(e) {
			$('#picture').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0])
	}
}

function makeDivs(main, prop, value) {
	main.append('<div class="line"> <span class="prop">'+prop+'</span><span class="value">'+value+'</span></div>')
}

function getLogo(lang) {
	let logo = [
		{id: 'JS', link: 'https://www.pngkey.com/png/detail/550-5509803_js-logo-javascript-logo-circle-png.png'},
		{id: 'PY', link: 'https://steamuserimages-a.akamaihd.net/ugc/946219835806282284/D1179AA95880DECCFFA1DADF06C4084941FF94F4/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'},
		{id: 'CS', link: 'https://ondemand.certificationcamps.com/wp-content/uploads/c-sharp-logo.png'},
		{id: 'JV', link: 'https://miro.medium.com/max/1200/1*mg3p2-xX4xP5vVAU_Qhc7Q.jpeg'},
		{id: 'CPP', link: 'https://avatars.mds.yandex.net/get-pdb/992060/51e0fee4-011c-4e71-98b5-ef184bd53c71/s1200'},
		{id: 'Ruby', link: 'https://media.rubylife.com/wp-content/uploads/2016/07/Ruby_Logo_Stacked-01.jpg'},
		{id: 'C', link: 'https://yt3.ggpht.com/a/AATXAJyHLvS46dut9Bah3XIC0FoaSuJ0r3Cb2RTolg=s900-c-k-c0xffffffff-no-rj-mo'},
		{id: 'PL', link: 'http://bezwindowsa.ru/wp-content/uploads/2015/06/mzm.egxopjva.png'},
		{id: 'PHP', link: 'https://avatars.mds.yandex.net/get-zen_doc/1567436/pub_5de0e4653a5b3a5707fa787a_5de0e46bc7e50c00b24b89eb/scale_1200'},
		{id: 'DEL', link: 'https://www.4wheelsnews.com/images/photo_galleries/original/12898/delphi_logo.jpg'}
	];

	let images = ''
	for (let i = 0; i < lang.length; i++) {
		let imgLink = logo.find(item => item.id == lang[i]).link
		images += '<img class="icon" src="'+imgLink+'">'
	}

	return images
}

function getLang() {
	let langID = []
	let checkboxes = $('input[name="lang"]:checked')
	for (let i = 0; i < checkboxes.length; i++) {
		langID.push(checkboxes[i].id)
	}

	return langID
}

function getAge(date) {
	let tmp = date.split("-");
	let year = +tmp[0]
	let month = +tmp[1]
	let day = +tmp[2]

	const now = new Date()
	let nowYear = +now.getFullYear();
	let nowMonth = +now.getMonth() + 1
	let nowDay = +now.getDate()

	let age = nowYear - year;
	if (nowMonth < month) {
		age--;
	}
	else if (nowMonth == month) {
		if (nowDay < day) {
			age--;
		}
	}

	return age
}