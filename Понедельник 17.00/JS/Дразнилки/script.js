let randAnimals = ['свиньи', 'собаки', 'жирафа', 'бегемота', 'макаки'];
let randPril = ['кривой', 'тупой', 'большой', 'вонючий', 'страшный'];
let randBody = ['нос', 'мозг', 'рот', 'лоб', 'череп'];

for (let i = 0; i < 10; i++) {
	let randA = Math.floor(Math.random()*randAnimals.length)
	let randP = Math.floor(Math.random()*randPril.length)
	let randB = Math.floor(Math.random()*randBody.length)

	let str = 'Твой ' + randBody[randB] + ' ' + randPril[randP] + ' как у ' + randAnimals[randA] + '!';

	alert(str)
}
