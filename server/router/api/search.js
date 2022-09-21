const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')

//搜索 api
router.get('/search',async (req,res)=>{ 
	 let {key} = req.query
	 key = `%${key}%`
	 let arr = [];
	 let num = 0;
	 let sql = "select * from store_good where good_name like ? "
	 let result = await query(sql,[key]);
	 res.send(JSON.stringify({
		code: 200,
		msg: '查询成功',
		data:result
	 }))
})








module.exports = router	