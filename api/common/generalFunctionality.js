var md5 = require('md5');

module.exports = {
	passwordEncryption: function (password) {
		return md5(password);
	},
	generateReponse: function(statusCode, status, message) {
		var response = {};
		response.statusCode = statusCode;
		response.status = status;
		response.message = message;
		return response;
	}
};
