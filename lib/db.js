const fs = require('fs');

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

const getDb = (db) => {
	if (fs.existsSync(db)) {
		let prevData = JSON.parse(fs.readFileSync(db));
		return prevData;
	} else {
		throw new Error("DB Doesn't exist");
	}
};

module.exports = {
	createDb,
	deleteDb,
	getDb,
};
