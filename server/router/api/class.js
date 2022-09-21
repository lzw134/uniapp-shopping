const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
// 三级级路由

// 获取api
router.get('/list',async(req,res)=>{
	let sql = "select * from store_class"
	query(sql).then(result=>{
		res.send(JSON.stringify({
			 code:200,
			 msg:'获取成功',
			 data:result
		}))
	})
})
	module.exports = router