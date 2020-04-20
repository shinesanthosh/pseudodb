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

// addDoc("main.json", { name: "someone", age: "unknown" });
// setDoc("main.json", "a", { name: "reset", age: "18" });
// createDb("main.json");
// setField("main.json", "a", "age", "22");
// console.log(getDoc("main.json", "a"));
// console.log(funcs.random(10));

module.exports = {
	addDoc: addDoc,
	createDb: createDb,
	getDoc: getDoc,
	setField: setField,
	setDoc: setDoc,
};
