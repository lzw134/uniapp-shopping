/*创建http模块*/
var http = require('http')
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
/*引入ejs*/
const ejs = require('ejs')
/*引入session*/
const Session = require('cookie-session')



const app = express();
app.use(bodyParser.json({limit :"2100000kb"}));  
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


/*使用session*/
app.use(Session({
	/*对session进行加密*/
	keys:['aa','fdsf','fdsfdsf']
}))


// 把模板引擎设置成ejs
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


 // 设置静态文件访问
app.use(express.static(path.join(__dirname,'public')))


app.get('/login',(req,res)=>{
	res.send('hello world')
})


app.use('/admin',Admin);
app.use('/api',Api);


/*token验证失败进行处理*/
app.use((err,req,res,next)=>{
	if(err = "UnauthorizedError"){
		res.send({
			code:444,
			msg:'身份过期,请重新登录'
		})
	}
	res.status(404)
	res.render('404')
})

app.listen(5000,()=>{
	console.log('服务器启动成功');
	})