const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
const internal = require('stream')
// 三级级路由

// 获取商品列表 api
router.get('/list',(req,res)=>{
	let sql = "select * from store_good where good_id = ?"
	let {good_id} = req.query
	query(sql,[good_id]).then(result=>{
		res.send(JSON.stringify({
			 code:200,
			 msg:'获取成功',
			 data:result
			
		}))
	})
})

//按照销量降序的所有商品数据 
router.get('/hot',(req,res)=>{
	let sql = "select id,good_pic,good_name,new_price,good_sales,good_describe from store_good LIMIT ?,?" 
	let {pageIndex} = req.query
	query(sql,[pageIndex===1?1:pageIndex*4-4,pageIndex*4]).then(result=>{
		for(var i = 0;i<result.length;i++){
			/*拿给微信做测试用的*/ 
			result[i].flog = true
			result[i].count = 1
		}
		res.send(JSON.stringify({
			code:200,
			msg:'获取成功',
			data:result
		}))
	})
})

//获取商品详情  api
router.get('/detail',async (req,res)=>{
	let sql = "select * from store_good where id = ?"
	let {id} = req.query
	let result = await query(sql,[id]);
	result = result[0]
	let textareahtml = result.good_details
	var srcReg = /src=([\'\"]?([^\'\"]*)[\'\"]?)/ig;
	
	let serverSrc="http://localhost:5000"
	
	if (textareahtml){
		textareahtml = textareahtml.replace(srcReg, "src='" + serverSrc + "$2" + "'")
		result.good_details = textareahtml
	}
    res.send(JSON.stringify({
			 code:200,
			 msg:'获取成功',
			 data:result
		}))
})	



	module.exports = router