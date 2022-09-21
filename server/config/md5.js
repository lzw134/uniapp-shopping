const  crypto = require('crypto')

module.exports = {
	md5:function(str){
		let obj = crypto.createHash('md5');
		obj.update(str)
		//返回16进制
		return obj.digest('hex');
		//返回base64
		//return obj.digest('base64')
	}
}