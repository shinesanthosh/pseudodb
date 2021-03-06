const fs = require('fs');
const funcs = require('./funcs');
const relations = require('./relations');
const database = require('./db');
const { subscribe } = require('./monitor');

const setField = (db, id, field, data) => {
	if (fs.existsSync(db)) {
		if (field == undefined || data == undefined) {
			throw new Error('Setfield() :Undefined argument');
		} else {
			let prevData = JSON.parse(fs.readFileSync(db));
			prevData[id][field] = data;
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const getDoc = (db, id) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		return prevData[id];
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const addDoc = (db, data) => {
	if (fs.existsSync(db)) {
		if (data == undefined) {
			throw new Error('addDoc() :Undefined argument');
		} else {
			let rnd = '';
			let prevData = JSON.parse(fs.readFileSync(db));
			do {
				rnd = funcs.random(20);
			} while (prevData[rnd] != undefined);
			prevData[rnd] = data;
			prevData[rnd]['Relation'] = {};
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
			return rnd;
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const setDoc = (db, id, data) => {
	if (fs.existsSync(db)) {
		if (id == undefined || data == undefined) {
			throw new Error('setDoc() :Undefined argument');
		} else {
			let prevData = JSON.parse(fs.readFileSync(db));
			prevData[id] = data;
			prevData[id]['Relation'] = {};
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const findDoc = (db, field, value) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		for (let key in prevData) {
			if (prevData[key][field] == value) {
				return key;
			}
		}
		return undefined;
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const findAll = (db, field, value) => {
	if (fs.existsSync(db)) {
		let arr = [];
		let prevData = JSON.parse(fs.readFileSync(db));
		for (let key in prevData) {
			if (prevData[key][field] == value) {
				arr.push(key);
			}
		}
		return arr;
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const deleteDoc = (db, id) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		if (prevData[id] == undefined) {
			throw new Error("Doc Doesn't exist");
		} else {
			delete prevData[id];
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

// console.log(addDoc('main.json', { name: 'someone', age: '18' }));
// setDoc('main.json', 'a', { name: 'reset', age: '18' });
// database.createDb('main.json');
// setField('main.json', 'a', 'age', '22');
// console.log(getDb('main.json'));
// console.log(getDoc('main.json','a'));
// deleteDb('main.json');
// console.log(findDoc('main.json', 'name', 'reset'));
// deleteDoc('main.json', 'a');
// console.log(findAll('main.json', 'age', '18'));
// relations.setRel('main.json', 'a', 'brother','b');
// console.log(relations.getRel('main.json', 'a','brother'))
// subscribe('main.json').on('dbChange', (curr, prev) =>
// 	console.log('Current: ', curr, ' Previous: ', prev)
// );

module.exports = {
	addDoc,
	getDoc,
	setField,
	setDoc,
	findDoc,
	findAll,
	deleteDoc,
	getDb: database.getDb,
	deleteDb: database.deleteDb,
	createDb: database.createDb,
	setRel: relations.setRel,
	setRelGrp: relations.setRelGrp,
	getRel: relations.getRel,
	deleteRel: relations.deleteRel,
	subscribe,
};
