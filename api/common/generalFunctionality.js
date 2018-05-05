var md5 = require('md5');

module.exports = {
	passwordEncryption: function (password) {
		return md5(password);
	},
	generateReponse: function(statusCode, status, message, data) {
		var response = {};
		response.statusCode = statusCode;
		response.status = status;
		response.message = message;
		response.data = data;
		return response;
	}
};
