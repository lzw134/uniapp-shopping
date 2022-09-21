let  time = function(){
	var d = new Date(),
	str = '';
	str += d.getFullYear() + '年'; //获取当前年份 
	str += d.getMonth() + 1 + '月'; //获取当前月份（0——11） 
	str += d.getDate() + '日';
	str += d.getHours() + '时';
	str += d.getMinutes() + '分';
	str += d.getSeconds() + '秒';
	return  str;
}

module.exports = {
	time
}