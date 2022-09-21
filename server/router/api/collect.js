//三级路由
const express = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')



// 点击收藏
router.get('/add', async (req, res)=>{
    let u_id = req.user.u_id
	let {s_id} = req.query
	
	
	let sql = "select * from store_collect where u_id = ?  and s_id = ?"
	let result = await query(sql,[u_id,s_id]);
	
	
	if(result.length!==0){
		res.send(JSON.stringify({
			code: 400,
			msg: '已经收藏该商品'
		}))
	}else{
		let sql = "insert into store_collect (u_id,s_id) value (?,?)"
		query(sql,[u_id,s_id]).then(result=>{
			res.send(JSON.stringify({
				code:200,
				msg:'收藏成功'
			}))
		})
	}	
})

//查询个人收藏的商品
router.get('/select',async (req,res)=>{
	let u_id = req.user.u_id
	/*存储批量删除的id*/
	let clear_id = [];
	
	let sql = "select g.id,g.good_name,g.good_pic,g.new_price from store_collect s left join store_good g on s.s_id = g.id where s.u_id = ?"
	
	let result = await query(sql,[u_id]);
	
	for(var i = 0;i<result.length;i++){
		/*判断查询的结果是否为空，说明该商品不存在将它加入到删除数组中*/
		if(result[i].id==null){ 
			clear_id.push(result[i].s_id)
			result.splice(i,1);
		}	
	}
	/*批量删除数据*/
	if(clear_id.length!==0){
			 let clear_sql = "delete from store_collect where s_id in (?)"
			 
			 query(clear_sql,clear_id,function(err, rows, fields){
			 		 if(err){
			 			 console.log('DELETE ERROR - ', err.message);
			 			 return;
			 		 }
			 })
	}
	
	res.send(JSON.stringify({
		code: 200,
		msg: '查询成功',
		data:result
	}))
})

//删除商品
router.get('/del',(req,res)=>{
	let u_id = req.user.u_id
	
	let {s_id} = req.query
	
	
	let sql = "delete from store_collect where u_id = ? and s_id = ?"
	
     query(sql,[u_id,s_id]).then(result=>{
		  res.send(JSON.stringify({
			code: 200,
			msg: '删除成功'
		  }))
	 });
	
	
})


module.exports = router
