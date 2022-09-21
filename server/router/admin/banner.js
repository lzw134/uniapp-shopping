// 登陆模块
const express  = require('express')
const router = express.Router()



const multer = require('multer')
const path = require('path')
const fs = require('fs')


//引入时间模块
const {time} = require('../../config/date.js')


const {
	query
} = require('../../db/conn.js')


// 加载banner列表
router.get('/list',(req,res)=>{
	// 去查询banner列表
	 let sql = "select * from store_banner_pic "
	 query(sql).then(result=>{	    
		 	res.render('banner/list',{result})
	 })
})




//添加banner接口
router.post('/banner_save',multer({dest:'./public/banner/'}).any(),(req,res)=>{
     let ext = path.parse(req.files[0].originalname).ext
	 let str =  time();
     fs.rename(req.files[0].path,req.files[0].path+ext,err=>{
     	let file = "/banner/"+req.files[0].filename+ext
       let sql_insert = "insert into store_banner_pic (banner_pic,add_time) value (?,?)"
     	query(sql_insert,[file,str]).then(data=>{
     			res.send('<script>alert("新增banner图成功");location.href="/admin/banner/list"</script>')
     	})
     })
})


//删除banner接口
router.get('/banner_delete',(req,res)=>{
	let {id} = req.query
	/*根据id查询该管理员的具体信息*/
	 let sql_delete = "delete  from store_banner_pic where id = ?"
	 query(sql_delete,[id]).then(result=>{
	 	    if(result){
	 			res.send('<script>alert("删除成功");location.href="/admin/banner/list"</script>')
	 		}
	 	})
})
//修改banner接口
router.post('/banner_update',multer({dest:'./public/banner/'}).any(),(req,res)=>{
     let ext = path.parse(req.files[0].originalname).ext
	
	 let {id} = req.body
	  let str =  time();
	 
	 /*根据id查询该管理员的具体信息*/
	 let sql = "select * from store_banner_pic where id=?"
	 /*将查询的结果赋值给页面*/
	 query(sql, [id]).then(result => {
	 	req.session.banner_pic = result[0].banner_pic
	 })
	 
     fs.rename(req.files[0].path,req.files[0].path+ext,err=>{
       let file = "/banner/"+req.files[0].filename+ext
	   let sql_update = "update store_banner_pic set banner_pic=?,add_time=? where id=?"
     query(sql_update,[file,str,id]).then(data=>{
     	fs.unlink('./public'+req.session.banner_pic,err=>{
     		res.send('<script>alert("修改成功");location.href="/admin/banner/list"</script>')
     	})
     	
     })
     })
})



module.exports = router