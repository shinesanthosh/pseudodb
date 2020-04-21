const fs = require('fs');
const funcs = require('./funcs');

const setField = (db, id, field, data) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		prevData[id][field] = data;
		const jsonString = JSON.stringify(prevData);
		fs.writeFileSync(db, jsonString);
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

const createDb = (db) => {
	if (fs.existsSync(db)) {
		throw new Error('DB Already Exists');
	} else {
		fs.writeFileSync(db, '{}');
	}
};

const deleteDb = (db) => {
	if (fs.existsSync(db)) {
		fs.unlinkSync(db);
		return true;
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const addDoc = (db, data) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		prevData[funcs.random(10)] = data;
		const jsonString = JSON.stringify(prevData);
		fs.writeFileSync(db, jsonString);
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const setDoc = (db, id, data) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		prevData[id] = data;
		const jsonString = JSON.stringify(prevData);
		fs.writeFileSync(db, jsonString);
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const getDb = (db) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		return prevData;
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

// addDoc('main.json', { name: 'someone', age: '22' });
// setDoc('main.json', 'a', { name: 'reset', age: '18' });
// createDb('main.json');
// setField('main.json', 'a', 'age', '22');
// console.log(getDb('main.json'));
// console.log(getDoc('main.json','a'));
// deleteDb('main.json');
// console.log(findDoc('main.json', 'name', 'reset'));

module.exports = {
	addDoc,
	createDb,
	getDoc,
	setField,
	setDoc,
	getDb,
	deleteDb,
	findDoc,
};
