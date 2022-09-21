// 登陆模块
const express = require('express')
const router = express.Router()
const path = require('path')
const {
	query
} = require('../../db/conn.js')

// 加载订单列表
router.get('/list', async (req, res) => {
	// 去查询banner列表
	let sql_select_shop = "select distinct * from store_order o left join store_address a  on o.u_id = a.u_id  inner join store_good g on o.s_id = g.id where isDefault = 1"
    
	
	let result = await query(sql_select_shop);

    let img = [];
    for (var i = 0; i < result.length; i++) {
    	let imgs = JSON.parse(result[i].good_pic)
    	img.push(imgs[0])
    }
	
	
	res.render('home/order', {
		result,
		img
	})


})


//发货API
router.get('/send', (req,res)=>{
	//更新状态
	let {id}  = req.query
    
	let update_sql = "update store_order set  code = 2  where order_id = ?"

	query(update_sql,[id]).then(result=>{
		res.send('<script>alert("发货成功");location.href="/admin/order/list"</script>')
	})
})

module.exports = router