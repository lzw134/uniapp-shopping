const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
// 三级级路由

// 获取所有留言api
router.get('/selectAll',async(req,res)=>{
	let sql = "select * from store_liuyan left join store_user on store_liuyan.u_id = store_user.u_id"
	query(sql).then(result=>{
		res.send(JSON.stringify({
			 code:200,
			 msg:'获取成功',
			 data:result
			
		}))
	})
})
	module.exports = router