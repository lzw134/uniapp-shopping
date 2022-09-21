const express  = require('express')
const router = express.Router()
const {query} = require('../../db/conn.js')
var url = require('url')
const {md5}  =require('../../config/md5.js');
const {MD5_STR} = require('../../config/MD5_STR.js')


//修改密码 api
router.post('/updatepassword',async (req,res)=>{ 
	   let {username,oldpassword,newpassword}  = req.body
	   let sql = "select * from store_user where username = ?"
	   let result = await query(sql,[username]);  
	   oldpassword =  md5(`${oldpassword}${MD5_STR}`);
	   if(result[0].password==oldpassword){
		   let sql = "update  store_user set password = ? where username = ?"
		   newpassword = md5(`${newpassword}${MD5_STR}`)
		   query(sql,[newpassword,username]).then(result=>{
			     res.send(JSON.stringify({
			     	code:200,
			     	msg:'修改成功'
			     }))
		   })
	   }else{
		        res.send(JSON.stringify({
		     	code:400,
		   	    msg:'旧密码错误'
		        }))
	   }
})


module.exports = router	