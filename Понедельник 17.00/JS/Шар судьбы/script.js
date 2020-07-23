let question = prompt('Спроси у шара, всё что захочешь, (не забудь знак "?")');

if(question == null) {
    alert('Ну и ладно'); 
}
else {
	let answers = [
		'Да, абсолютно точно.',
		'Скорее да, чем нет.',
		'Нет, исключено.',
		'Скорее нет, чем да.',
		'Даже не знаю такое...',
		'Зря не задал вопрос.' 
	];

	let n = question.indexOf('?');

	let randindex = Math.floor(Math.random()*(answers.length-1));
	// Если в вопросе нет знака ?
	while(n == -1) {
	    question = prompt('Спроси у шара, всё что захочешь, (не забудь знак "?")');
	    if (question != null) {
	    	n = question.indexOf('?');
	    }
	    else {
	    	randIndex = answers.length - 1
	    	break
	    }
	}

	

	alert(answers[randindex]);
}