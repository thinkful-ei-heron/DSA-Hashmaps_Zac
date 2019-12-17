'use strict';

const HashMap = require('./HashMap');

function main() {
	const lotr = new HashMap();
	lotr.MAX_LOAD_RATIO = 0.5;
	lotr.SIZE_RATIO = 3;
	lotr.set('Hobbit', 'Bilbo');
	lotr.set('Hobbit', 'Frodo');
	lotr.set('Wizard', 'Gandalf');
	lotr.set('Human', 'Aragorn');
	lotr.set('Elf', 'Legolas');
	lotr.set('Maiar', 'The Necromancer');
	lotr.set('Maiar', 'Sauron');
	lotr.set('RingBearer', 'Gollum');
	lotr.set('LadyOfLight', 'Galadriel');
	lotr.set('HalfElven', 'Arwen');
	lotr.set('Ent', 'Treebeard');

	console.log(lotr);

	console.log(lotr.get('Maiar'));
	console.log(lotr.get('Hobbit'));
}

const WhatDoesThisDo = function () {
	let str1 = 'Hello World.';
	let str2 = 'Hello World.';
	let map1 = new HashMap();
	map1.set(str1, 10);
	map1.set(str2, 20);
	let map2 = new HashMap();
	let str3 = str1;
	let str4 = str2;
	map2.set(str3, 20);
	map2.set(str4, 10);

	console.log(map1.get(str1));
	console.log(map2.get(str3));
};

function removeDups(str) {
	let output = '';
	const map = new HashMap();

	for (let i = 0; i < str.length; i++) {
		map.set(i, str[i]);
	}
	for (let i = 0; i < str.length; i++) {
		if (!output.includes(map.get(i))) output += str[i];
	}
	return output;
}

function anyPermPali(str) {
	const input = [];
	const anagrams = (str, prefix = '') => {
		if (str.length === 1) input.push(prefix + str);
		for (let i = 0; i < str.length; i++) {
			anagrams(
				str.substring(0, i) + str.substring(i + 1),
				prefix + str.substring(i, i + 1)
			);
		}
	};
	anagrams(str);

	const isPalim = (str) => {
		const map = new HashMap();
		const center = Math.ceil(str.length / 2);
		for (let i = 0; i < str.length; i++) {
			if (i < center) map.set(i, str[i]);
			if (i > center && map.get(str.length - i) !== str[i]) return false;
		}
		return true;
	};

	for (let i = 0; i < input.length; i++) {
		if (isPalim(input[i])) return true;
	}
	return false;
}

function anagramGroup(list) {
	const isAna = (str1, str2) => {
		const arr = [];
		const anagrams = (str, prefix = '') => {
			if (str.length === 1) arr.push(prefix + str);
			for (let i = 0; i < str.length; i++) {
				anagrams(
					str.substring(0, i) + str.substring(i + 1),
					prefix + str.substring(i, i + 1)
				);
			}
		};
		anagrams(str1);
		if (arr.includes(str2)) return true;
		return false;
	};

	const map = new HashMap();
	map.set(0, [list[0]]);
	map.set('length', 1);

	for (let i = 1; i < list.length; i++) {
		for (let j = 0; j < map.get('length'); j++) {

			if (isAna(map.get(j)[0], list[i])) {
				map.set(i, map.get(j).push(list[i]));
			}
			else {
				map.set(j + 1, [list[i]]);
				map.set('length', map.get('length') + 1);
			}
		}
	}

	const output = [];
	for (let i = 0; i < map.get('length'); i++) {
		output.push(map.get(i));
	}

	return output;
}

// main();

// WhatDoesThisDo();

// console.log(removeDups('google all that you can think of'));

// console.log(anyPermPali('acecarr'));
// console.log(anyPermPali('north'));

console.log(anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));


