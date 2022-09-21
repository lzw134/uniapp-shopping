const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
//引入时间模块
const {time} = require('../../config/date.js')
//引入生成随机编码模块
const {number}  = require('../../config/number.js')

//获取金额接口 api
router.get('/total',async(req,res)=>{
	   let u_id = req.user.u_id
	   let sql = "select * from store_order o  join store_good g on o.s_id = g.id where o.u_id = ? and code = 0"
	   let result = await query(sql,[u_id]);
	   let total = 0;
	   for(var i = 0;i<result.length;i++){
	      total  += result[i].count*result[i].new_price
	   }
	   res.send(JSON.stringify({
		   code:200,
		   msg:'查询成功',
		   data:total
	   }))
})

/*未完成支付*/ 
router.get('/order',async(req,res)=>{
	    let u_id = req.user.u_id
		// 获取前端传输过来的商品数组
		let {list} =  req.query 
		// 获取需要从购物车中删除的ID
		let arr_id = []
		//获取当前时间
	    var str = time();
		//获取当前编码
		var num = number();
		
		//二维数组进行转换 
		list = JSON.parse(list)	
		for(var i = 0;i<list.length;i++){
			arr_id.push(list[i][0])
			list[i].shift()
			list[i].push(u_id)
			list[i].push(str)
			list[i].push(num)
		}
	
		for(var i = 0;i<list.length;i++){
			let insert_sql = "insert into store_order (`s_id`,`count`,`u_id`,`time`,`number`) VALUES (?,?,?,?,?)";
			await query(insert_sql,list[i]);
			let delete_sql = "delete from store_shop where shop_id = ?"
			await query(delete_sql,arr_id[i])
		}
		
		res.send(JSON.stringify({
			code: 200,
			msg: '操作成功'
		}))
})

/*查询未完成支付的订单*/
router.get('/list',async(req,res)=>{
	   let u_id = req.user.u_id
	   let sql = "select * from store_order o  join store_good g on o.s_id = g.id where o.u_id = ? and o.code = 0"
	   let result = await query(sql,[u_id]);
	   res.send(JSON.stringify({
		   code:200,
		   msg:'查询成功',
		   data:result
	   }))
})

/*完成支付*/
router.get('/pay',async(req,res)=>{
	   let u_id = req.user.u_id
	   let sql = "update store_order set code = 1 where u_id = ? and code = 0"
	   let result = await query(sql,[u_id]);
	   res.send(JSON.stringify({
		   code:200,
		   msg:'支付成功'
	   }))
})


module.exports = router