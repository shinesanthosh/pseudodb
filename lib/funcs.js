const random = (num) => {
	var string;
	const chars =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var ar = chars.split('');
	string = '';

	for (var i = 0; i < num; i++) {
		var rand = Math.floor(Math.random() * 61);
		string += ar[rand];
	}

	return string;
};

module.exports.random = random;
