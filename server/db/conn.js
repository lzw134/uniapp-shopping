//对数据库进行封装
const mysql = require('mysql')
const config = require('../config/config.js')

//链接池
const pool = mysql.createPool(config)


async function query_async(sql,parm=[]){
	

	  let con = await query(sql,parm)
	   
	 
	  return con

}

function query(sql,parm=[]){
	return new Promise((resolve,reject)=>{
		pool.getConnection((err,con)=>{
			if(err){
				reject(err)
				return
			}

			con.query(sql,parm,(err,result)=>{
				con.release()
				if(err){
					reject(err)
					return
				}
				resolve(result)	
			})
		})
	})
}

module.exports ={
	query,
	query_async
} 

//odule.exports = 