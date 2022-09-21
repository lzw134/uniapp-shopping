// 三级级路由
const express = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')


/*查询订单API*/
router.get('/order',async(req,res)=>{
   //获取前端传输过来的数据 
   let {code}  = req.query
   /*存储批量删除的id*/
   let clear_id = [];
   /*解析token里面的u_id值*/ 
   let u_id = req.user.u_id
   let sql = "select * from store_order o left join store_good g on o.s_id=g.id where o.code = ? and o.u_id = ?"
   let result = await query(sql,[code,u_id]);
   /*判断查询的结果是否为空，说明该商品不存在将它加入到删除数组中*/
   for(var i = 0;i<result.length;i++){
   	if(result[i].id==null){ 
   		clear_id.push(result[i].s_id)
   		result.splice(i,1);
   	}	
   }
   /*批量删除数据*/
   if(clear_id.length!==0){
   		 let clear_sql = "delete from store_order where s_id in (?)"	 
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
/*修改订单状态API*/
router.get('/update',(req,res)=>{
   /*获前端传输过来的order_id*/ 
   let {order_id}  = req.query
   /*获取需要修改的订单状态*/ 
   let {code} = req.query
    /*解析token里面的u_id值*/ 
    let u_id = req.user.u_id
   
    let sql = "update store_order set code = ? where order_id = ? and u_id = ?"

    query(sql,[code,order_id,u_id]).then(result=>{
           /*返回数据*/
          res.send(JSON.stringify({
   	    code: 200,
   	    msg: '修改成功',
          }))
    })
})

/*删除订单API*/
router.get('/delete',async(req,res)=>{
	
	
	
	
})
 

module.exports = router