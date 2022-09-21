// 三级级路由
const express = require('express')
const router = express.Router()
const {
	query
} = require('../../db/conn.js')


//查询该用户的所有购物车商品
router.get('/list',async (req,res)=>{
	/*存储批量删除的id*/ 
	let clear_id = [];
	
	let u_id = req.user.u_id
	/*
	*leftjoin左链接,表1左链接2
	*
	*表一是购物车表，表二是商品表。一遍商品表中的商品有些会没有，所有需要根据表二为主来进行查询
	*/ 
	let sql = "select * from store_shop s left join store_good g on s.s_id = g.id where s.u_id = ?"
	let result = await query(sql,[u_id]);
	

	for(var i = 0;i<result.length;i++){
		/*给每一个查询到的商品加一个字段flog*/
		result[i].flog = true
		
		/*判断查询的结果是否为空，说明该商品不存在将它加入到删除数组中*/
		if(result[i].id==null){ 
			clear_id.push(result[i].s_id)
			result.splice(i,1);
		}
		
	}
	
     /*批量删除数据*/
	 if(clear_id.length!==0){
		 let clear_sql = "delete from store_shop where s_id in (?)"
		 
		 query(clear_sql,clear_id,function(err, rows, fields){
		 		 if(err){
		 			 console.log('DELETE ERROR - ', err.message);
		 			 return;
		 		 }
		 })
	 }
	
	 
	/*返回数据*/ 
	res.send(JSON.stringify({
		code: 200,
		msg: '查询成功',
		data:result
	}))
})

//删除购物车API
router.post('/delete', (req,res)=>{
    let u_id = req.user.u_id
	let {id} = req.body
	
	
	let sql = "delete from store_shop where s_id = ? and u_id = ?";
	
	query(sql,[id,u_id]).then(result=>{
		res.send(JSON.stringify({
			code: 200,
			msg: '删除成功'
		}))
})
})

//加减数值API
router.post('/num',(req,res)=>{
	
	let u_id = req.user.u_id
	
	let {s_id} = req.body
	
	let {count} = req.body
	
	console.log(count)
	
	let sql = "update store_shop set count = ? where s_id = ? and u_id = ?"
	
	query(sql,[count,s_id,u_id]).then(result=>{
		res.send(JSON.stringify({
			code: 200,
			msg: '修改成功'
		}))
})	
})


// 添加到购物车API 
router.get('/add', async (req, res) => {

	let u_id = req.user.u_id

	console.log(u_id)


	let {s_id} = req.query
	let {count} = req.query	
	count = Number(count);
	
	let {telp} = req.query

	let sql = "select * from store_shop where  u_id = ?  and s_id = ?"


	let result = await query(sql, [u_id, s_id]);



	query(sql, [u_id, s_id]).then(result => {
		if (result.length !== 0) {
			let sql = "update store_shop set count = ? where s_id = ? and u_id = ?"
			if (telp == 1) {
				query(sql, [result[0].count + 1,result[0].s_id,result[0].u_id]).then(result => {
					res.send(JSON.stringify({
						code: 200,
						msg: '添加到购物车成功'
					}))
				})
			} else {
				query(sql, [result[0].count+count,result[0].s_id,result[0].u_id]).then(result => {
					res.send(JSON.stringify({
						code: 200,
						msg: '添加到购物车成功'
					}))
				})
			}
		} else {
			let sql = "insert into store_shop (u_id,s_id,count) value (?,?,?)"
			
			
			query(sql, [u_id, s_id,count]).then(result => {
				res.send(JSON.stringify({
					code: 200,
					msg: '添加到购物车成功'
				}))
			})
			query(sql, [u_id, ])
		}
	})
})

module.exports = router
