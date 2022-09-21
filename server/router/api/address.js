const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
// 三级级路由

//添加地址 api
router.get('/add',async (req,res)=>{
	/*前端传输的数据*/ 
	let {username,iphone,tel,address,home,isDefault}  = req.query  
	
	/*获取token解析的数据*/
	 let u_id = req.user.u_id
	/*判断是否存在用户*/ 
	let exist_sql = "select * from store_address where u_id = ?"	
	let exist_result = await query(exist_sql,[u_id]);	
	
	
	console.log(exist_result.length)
	if(exist_result.length==3){
		res.send(JSON.stringify({
			 code:400,
			 msg:'最多上传三条地址',
		}))
	}else{
		if(isDefault==1){
			/*将全部都设置为0*/
			let clear_sql = "update store_address set isDefault = 0";
			await query(clear_sql);
			
			let insert_sql = "insert into store_address(u_id,name,tel,fix_tel,address,home,isDefault) value(?,?,?,?,?,?,?)"
			query(insert_sql,[u_id,username,iphone,tel,address,home,isDefault]).then(result=>{
				res.send(JSON.stringify({
					 code:200,
					 msg:'上传地址成功',
				}))
			})
		}else{
			let insert_sql = "insert into store_address(u_id,name,tel,fix_tel,address,home) value(?,?,?,?,?,?)"
			query(insert_sql,[u_id,username,iphone,tel,address,home]).then(result=>{
				res.send(JSON.stringify({
					 code:200,
					 msg:'上传地址成功',
				}))
			})
		  }	
	}
})
//查询默认地址api
router.get('/query_default',(req,res)=>{
	/*获取token解析的数据*/
	let u_id = req.user.u_id
	/*前端传输的数据*/
	let sql = "select * from store_address where u_id = ? and isDefault = 1"	
	query(sql,[u_id]).then(result=>{
		res.send(JSON.stringify({
			 code:200,
			 msg:'查询成功',
			 data:result
		}))
	})
})


//查询个人地址api
router.get('/query',(req,res)=>{
	/*获取token解析的数据*/
	let u_id = req.user.u_id
	
	let select_sql = "select * from store_address where u_id = ?"
	
    query(select_sql,[u_id]).then(result=>{
		
		/*将默认的设置为true*/ 
		for(var i = 0;i<result.length;i++){
			if(result[i].isDefault==1){
				result[i].isDefault = true
			}else{
				result[i].isDefault = false
			}
		}
		
		res.send(JSON.stringify({
		 code:200,
		 msg:'查询成功',
		 data:result
		}))		
	})	
})
//回显修改地址api
router.get('/queryuid',(req,res)=>{
	/*获取token解析的数据*/
	
	
	let {id} = req.query
	
	console.log(id)
	let select_sql="select * from store_address where id = ?"
	query(select_sql,[id]).then(result=>{
		res.send(JSON.stringify({
		 code:200,
		 msg:'查询成功',
		 data:result
		}))	
	})
})
// 修改个人地址api
router.get('/update',async(req,res)=>{
	let {id,username,iphone,tel,address,home,isDefault}  = req.query
	isDefault = Number(isDefault)
	if(isDefault==1){
		/*将全部都设置为0*/ 
		let clear_sql = "update store_address set isDefault = 0";
		await query(clear_sql);
		/*将某一个设置成默认*/ 
		let update_sql = "update store_address set name = ?,tel = ?,fix_tel = ?,address = ?,home = ?,isDefault = ? where id = ? "
		query(update_sql,[username,iphone,tel,address,home,1,id]).then(result=>{
			  res.send(JSON.stringify({
				  code:200,
				  msg:'修改成功',
				  data:result
			  }))
		})
	}else{
		let update_sql = "update store_address set name = ?,tel = ?,fix_tel = ?,address = ?,home = ? where id = ? "
		query(update_sql,[username,iphone,tel,address,home,id]).then(result=>{
			  res.send(JSON.stringify({
				  code:200,
				  msg:'修改成功',
				  data:result
			  }))
		})
	}
	
})
module.exports = router