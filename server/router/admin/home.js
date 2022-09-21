// 登陆模块
const express = require('express')
const router = express.Router()


const path = require('path')
//加载上传头像的插件
const multer = require('multer')
//加载文件修改的插件
const fs = require('fs')
//加载数据库查询模块


const {
	query
} = require('../../db/conn.js')


// 加载后台主页
router.get('/index', (req, res) => {
	/*接收session传输过来的值*/
	let u_id = req.session.u_id
	/*根据id查询该管理员的具体信息*/
	let sql = "select * from user where id=?"
	/*将查询的结果赋值给页面*/
	query(sql, [u_id]).then(result => {
		req.session.head_pic = result[0].head_pic
		res.render('home/index', {
			result
		})
	})
})

//加载修改密码页面
router.get('/changepassword', (req, res) => {
	res.render('home/changepassword');
})

//加载欢迎页面
router.get('/welcome', (req, res) => {
	res.render('home/welcome');
})

// 加载修改头像页面
router.get('/changehead',(req,res)=>{
	let pic = req.session.head_pic
	res.render('home/changehead',{
		   pic
	});
})

//加载banner管理页面
router.get('/banner',(req,res)=>{
	res.render('banner/list')
})













// 修改头像后端接口
router.post('/head_save',multer({dest:'./public/head/'}).any(),(req,res)=>{
	//提取文件名的后缀
	let ext = path.parse(req.files[0].originalname).ext
	fs.rename(req.files[0].path,req.files[0].path+ext,err=>{
		let file = "/head/"+req.files[0].filename+ext
		let u_name = req.session.u_name
		
		console.log(req.session.head_pic)
		let sql_update = "update user set head_pic=? where username=?"
		query(sql_update,[file,u_name]).then(data=>{
			fs.unlink('./public'+req.session.head_pic,err=>{
				res.send('<script>alert("修改成功");parent.location.href="/admin/home/index"</script>')
			})
	
		})
		
		
	})
})

//修改密码后端接口
router.post('/pass_save', (req, res) => {
	let {
		old_password,
		new_password,
		replace_password
	} = req.body
	
	if (replace_password == new_password) {
		
		
		let sql_select = "select * from user where username = ?";
		let username = req.session.u_name
		query(sql_select, [username]).then(result =>{
			console.log(result[0].password);
			console.log(old_password);
			if(result[0].password==old_password){
				
			
				let sql_update = "update user set password=? where username=?"
					query(sql_update, [new_password,username]).then(result =>{
					    if(result){
							res.send('<script>alert("密码修改成功");location.href="/admin/home/welcome"</script>')
						}
					})
			}else{
				res.send('<script>alert("密码错误,修改失败");location.href="/admin/home/changepassword"</script>')
			}
			
		})
	} else {
		console.log(replace_password);
		console.log(new_password);
		res.send('<script>alert("两次密码不一致");location.href="/admin/home/changepassword"</script>')
	}
})
module.exports = router
