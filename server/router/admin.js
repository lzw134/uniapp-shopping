/*加载url模块*/
var url = require('url');



/*生成一个根据传递过来的pathname进入不同接口的方法*/
function getdata(req,res){
	/*获取url字符串*/
	let objurl = url.parse(req.url)
	
}