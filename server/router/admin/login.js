const express = require('express')


const router = express.Router()


const {query,query_async}  =require('../../db/conn.js')
const  obj  = require('../../db/conn.js')
//三级路由
router.get('/login',(req,res)=>{
	   
	 //res.end('login');
	   res.render('login/login')
})


// 验证登陆
router.post('/ver',(req,res)=>{
  let { user_name,password } = req.body 

let sql = "select * from user where username=?"
     let data = query_async(sql,[user_name])
	 data.then(data=>{
		 if(data.length!=0){
			 if(data[0].password == password){
			   req.session.u_id = data[0].id
			   req.session.u_name = data[0].username
			   res.send('<script>alert("登陆成功");location.href="/admin/home/index"</script>')	
			 }else{
			   res.send('<script>alert("账号或者密码错误");location.href="/admin/login/login"</script>')
			 }
		 }else{
			  res.send('<script>alert("");location.href="/admin/login/login"</script>')
		 }
	 })
// 得到账号密码了，然后呢？去查数据看是否有账号存在，如果存在在对比密码是否正确
// 连接池
// 创建连接池

	
})


module.exports = router