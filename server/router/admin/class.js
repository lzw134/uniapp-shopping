// 登陆模块
const express  = require('express')
const router = express.Router()



const multer = require('multer')
const path = require('path')
const fs = require('fs')


const {query} = require('../../db/conn.js')

//引入时间模块
const {time} = require('../../config/date.js')



// 加载列表
router.get('/list', async (req,res)=>{
	// 去查询banner列表
	 let sql_1 = "select * from store_class where good_id = 0"
	 
	 let result = await query(sql_1);
	 
	 let nesting  = [];
	 	
		for(let i = 0;i<result.length;i++){
		     let sql_2 = "select * from store_class where good_id = ?"
			 
			             let resul = await query(sql_2,[result[i].id]);
						 
						 nesting.push(result[i])
						 
						 for(let j = 0;j<resul.length;j++){
						 							
						     resul[j].text  = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"  + resul[j].text
						 								 
				              nesting.push(resul[j])
						 							
						 }
		}
		
		
		res.render('home/class',{
			 nesting
		})
})


//修改分类接口
router.post('/update_list',multer({dest:'./public/class/'}).any(),(req,res)=>{
	
	
	let str =  time();
	
	//二级分类
	if(req.body.good_id!=0&&req.files.length==0){
		res.send('<script>alert("请先上传图片");location.href="/admin/class/list"</script>')
	}
	//一级分类
	else if(req.body.good_id==0){
		/*获取上一级分类*/
		let  {text,good_id,id} = req.body
		
		let sql_update = "update store_class set text=?,add_time=?,good_id=? where id=?"
		query(sql_update,[text,str,good_id,id]).then(result=>{
			 if(result){
				   res.send('<script>alert("一级分类修改成功");location.href="/admin/class/list"</script>') 
			 }
		})
	}else{
		let ext = path.parse(req.files[0].originalname).ext
		
		
		/*获取上一级分类*/
		let  {text,good_id,id} = req.body
		
		
		
		/*根据id查询该管理员的具体信息*/
		let sql_select = "select * from store_class where id=?"
		/*将查询的结果赋值给页面*/
		query(sql_select,[id]).then(result=>{
			req.session.class_update_pic = result[0].good_pic
		
		})
		 
		 
		    
		fs.rename(req.files[0].path,req.files[0].path+ext,err=>{
		  let file = "/class/"+req.files[0].filename+ext
		  let sql_update = "update store_class set text=?,good_pic=?,add_time=?,good_id=? where id=?"
		query(sql_update,[text,file,str,good_id,id]).then(data=>{
			fs.unlink('./public'+req.session.class_update_pic,err=>{
				res.send('<script>alert("二级分类修改成功");location.href="/admin/class/list"</script>')
			})
		})
		})
	}
	
	
	
})

//删除分类接口
router.get('/delete_list',(req,res)=>{
	
	let  {id} = req.query
	/*根据id查询该具体信息*/
	let sql_select = "select * from store_class where id=?"
	/*将查询的结果赋值给页面*/
	query(sql_select,[id]).then(result=>{
		req.session.class_delete_pic = result[0].good_pic
	
	})
	/*根据id删除分类信息*/
	 let sql_delete = "delete  from store_class where id = ?"
	 query(sql_delete,[id]).then(data=>{
	 	fs.unlink('./public'+req.session.class_delete_pic,err=>{
	 		res.send('<script>alert("分类删除成功");location.href="/admin/class/list"</script>')
	 	})
	 })
})


//添加分类接口
router.post('/add_list',multer({dest:'./public/class/'}).any(),(req,res)=>{
   
    let str =  time();
	
	
	if(req.files.length==0&&req.body.good_id!=0){
		res.send('<script>alert("请先上传图片");location.href="/admin/class/list"</script>')
	}else if(req.body.good_id==0){
	/*获取上一级分类*/
	let  {text,good_id} = req.body
	
	let sql_insert = "insert into store_class (text,add_time,good_id) value (?,?,?)"
				query(sql_insert,[text,str,good_id]).then(data=>{
						res.send('<script>alert("新增一级分类成功");location.href="/admin/class/list"</script>')
				})
	}else{
		let ext = path.parse(req.files[0].originalname).ext
		
		/*获取上一级分类*/
		let  {text,good_id} = req.body
		
		
		
		
		
		fs.rename(req.files[0].path,req.files[0].path+ext,err=>{
		  let file = "/class/"+req.files[0].filename+ext
		  let sql_insert = "insert into store_class (text,good_pic,add_time,good_id) value (?,?,?,?)"
			query(sql_insert,[text,file,str,good_id]).then(data=>{
					res.send('<script>alert("新增二级分类成功");location.href="/admin/class/list"</script>')
			})
		})
	}
	
	
	
	
	
	
})




module.exports = router