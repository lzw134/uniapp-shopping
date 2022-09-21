let  number = function(){
	var d = new Date(),
	str = '';
	str += d.getFullYear(); //获取当前年份 
	str += d.getMonth() + 1; //获取当前月份（0——11） 
	str += d.getDate();
	str += d.getHours();
	str += d.getMinutes();
	str += d.getSeconds();
	return  str;
}

module.exports = {
	number
}