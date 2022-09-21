/*创建http模块*/
var http = require('http')
var url = require('url')

/*创建服务*/
const express = require('express');
/*下载body-parser,nom install body-parser --save*/
const bodyParser = require('body-parser');
/*引入Admin*/
const Admin  = require('./router/admin/index.js');
/*引入api*/
const Api  =require('./router/api/index.js');
/*引入path*/
const path = require('path');

const server = express();

server.use(bodyParser.urlencoded({}))
server.use(bodyParser.json())

// 把模板引擎设置成ejs
server.set('view engine','ejs')
server.post('/',(req,res)=>{
	/*接受客户端发送过来的请求*/
	console.log(req.body)
	/*向客服端返回结果*/
	res.end('sss')
})
server.get('/',(req,res)=>{
	console.log(req.body.id)
	res.end('sss')
})
server.set('views',path.join(__dirname,'views'))
 // 设置静态文件访问
server.use(express.static(path.join(__dirname,'public')))


server.use('/admin',Admin);
server.use('/api',Api);

server.listen(1000)

const app = express();
/*get方式接受值*/
app.get('/index',(req,res)=>{
	console.log(req.query.id);
	console.log(req.query.name);
})
/*use可以不设置路由可以监听所有路由*/
app.use((req,res)=>{
	
	console.log('随便输入什么都能监听到');
})
app.listen(9218)



http.createServer((req,res)=>{
	//Access-Control-Allow-Origin
	res.setHeader("Access-Control-Allow-Origin",'*');
	// console.log(url.parse(req.url));
	// console.log('hello world');
	
	/*接口必须返回值才涉及到跨域问题*/
	
	/*给客户端发送请求的时候必须是字符串和json格式*/
	res.end('dwadasd');
	
	/* var obj = {
		name:'李志伟',
		age:18,
		sex:'男'
	} */
	
	//res.end(obj);
	
	//get方法接受值
	// var id = url.parse(req.url,true).query.id;
	
	//post方法接受值
	// var str  = ''
	// req.on('data',data=>{
	// 	str += data
	// })
	// req.on('end',()=>{
	// 	console.log(JSON.parse(str))
	// })
	
	
	
}).listen(4000)