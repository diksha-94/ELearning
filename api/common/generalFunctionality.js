var md5 = require('md5');

module.exports = {
	passwordEncryption: function (password) {
		return md5(password);
	}
};
