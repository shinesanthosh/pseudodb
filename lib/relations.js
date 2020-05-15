const fs = require('fs');

const getRel = (db, id, relation) => {
	if (fs.existsSync(db)) {
		if (id == undefined || relation == undefined) {
			throw new Error('getRel() :Undefined argument');
		} else {
			let prevData = JSON.parse(fs.readFileSync(db));
			return prevData[id]['Relation'][relation];
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const setRel = (db, id, relation, doc) => {
	if (fs.existsSync(db)) {
		if (id == undefined || relation == undefined || doc == undefined) {
			throw new Error('setRel() :Undefined argument');
		} else {
			let prevData = JSON.parse(fs.readFileSync(db));
			prevData[id]['Relation'][relation] = doc;
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const setRelGrp = (db, id, relation, doc) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		if (prevData[id]['Relation'][relation] == undefined) {
			prevData[id]['Relation'][relation] = [doc];
		} else {
			prevData[id]['Relation'][relation].push(doc);
		}
		const jsonString = JSON.stringify(prevData);
		fs.writeFileSync(db, jsonString);
	} else {
		throw new Error("DB Doesn't exist");
	}
};

const deleteRel = (db, id, relation) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		if (prevData[id]['Relation'][relation] == undefined) {
			throw new Error("Relation Doesn't exist");
		} else {
			delete prevData[id]['Relation'][relation];
			const jsonString = JSON.stringify(prevData);
			fs.writeFileSync(db, jsonString);
		}
	} else {
		throw new Error("DB Doesn't exist");
	}
};

module.exports = {
	setRel,
	setRelGrp,
	getRel,
	deleteRel,
};
