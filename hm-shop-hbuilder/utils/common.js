const getDate = function(date){
	/*将时间转换为正确的格式*/
	return this.$moment(date).format('yyyy-MM-DD hh:mm:ss')
}
module.exports = {
	getDate
}