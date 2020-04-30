const { EventEmitter } = require('events');
const fs = require('fs');

const subscribe = (db) => {
	if (fs.existsSync(db)) {
		let cur, pre;
		var obj = new EventEmitter();
		pre = JSON.parse(fs.readFileSync(db));

		fs.watchFile(db, { interval: 1000 }, (curr, prev) => {
			if (fs.existsSync(db)) {
				cur = JSON.parse(fs.readFileSync(db));
				obj.emit('dbChange', cur, pre);
				pre = JSON.parse(fs.readFileSync(db));
			} else {
				throw new Error('DB Deleted');
			}
		});

		return obj;
	} else {
		throw new Error("DB Doesn't exist");
	}
};

module.exports = { subscribe };
