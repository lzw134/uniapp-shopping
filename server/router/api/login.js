const express = require('express')
const router = express.Router()
const { query } = require('../../db/conn.js')
var url = require('url')
const { md5 } = require('../../config/md5.js');
const { MD5_STR, PRI_KEY, EXPIR } = require('../../config/MD5_STR.js')
const jwt = require('jsonwebtoken')
const request = require('request');
const { send } = require('process');

// 注册 api
router.post('/register', async (req, res) => {

	let { username, password, repassword } = req.body
	let sql = "select * from store_user where username = ?"
	let result = await query(sql, [username]);
	if (!result || result.length == 0) {
		let insert_sql = "insert into store_user (username,password) value (?,?)"
		password = md5(`${password}${MD5_STR}`)
		query(insert_sql, [username, password]).then(result => {
			res.send(JSON.stringify({
				code: 1,
				msg: '注册成功',
				data: result
			}))
		})
	} else {
		res.send(JSON.stringify({
			code: -1,
			msg: '账号已存在',
		}))
	}

})

//登录 api
router.post('/login', async (req, res) => {

	let { username, password } = req.body
	let sql = "select * from store_user where username = ?"
	let result = await query(sql, [username]);
	if (!result || result.length == 0) {
		res.send(JSON.stringify({
			code: -1,
			msg: '账号不存在',
		}))
	} else {
		if (md5(`${password}${MD5_STR}`) == result[0].password) {
			/*生成jsonwebtoken*/
			let token = jwt.sign({ u_id: result[0].u_id }, PRI_KEY, { expiresIn: EXPIR })
			res.send(JSON.stringify({
				code: 1,
				msg: '登陆成功',
				token
			}))
		} else {
			res.send(JSON.stringify({
				code: 0,
				msg: '密码错误',
			}))
		}
	}

})

// 获取微信信息api
router.get('/wget', async (req, res) => {
	let { openid } = req.body

	let insert_sql = "select * from store_weixin_user where openid = ?"

	query(insert_sql, [openid]).then(result => {
		res.send(JSON.stringify({
			code: 200,
			msg: '获取成功',
			data: result
		}))
	})
})

// 微信登录 api
router.post('/wlogin', async (req, res) => {
	let { code, nickName, avatarUrl } = req.body

	let authUrl = 'https://api.weixin.qq.com/sns/jscode2session?'

	let appid = 'wx1754d14ab380703b'

	let secret = 'c2d89bf7bfd059ed282ccfeff80f6616'

	const Url = `${authUrl}appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${code}`

	/*将URL进行转码*/
	const lastUrl = encodeURI(Url)

	/*请求微信第三方接口*/
	request(lastUrl, function (err, response, body) {
		//err 当前接口请求错误信息
		//response 一般使用statusCode来获取接口的http的执行状态
		//body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
		//需要通过JSON.parse(body)来转换
		// if (!err && response.statusCode == 200) {
		// 	//todoJSON.parse(body)
		// 	var res = JSON.parse(body);
		// }
		const arr = JSON.parse(body);

		if (arr.openid) {
			let select_sql = "select * from store_weixin_user where openid = ?"

			query(select_sql, [arr.openid]).then(result => {
				if (!result || result.length == 0) {
					/*没有该账号就进行注册*/
					let insert_sql = "insert into store_weixin_user (openid,nickName,avatarUrl) value (?,?,?)"
					query(insert_sql, [arr.openid, nickName, avatarUrl])
				}
				/*生成jsonwebtoken*/
				/*携带openid,购物车和个人中心可以根据openid进行查询*/
				let sql = "select * from store_user where openid = ?"
				query(sql, [arr.openid]).then(send => {
					let token = jwt.sign({ u_id: send[0].u_id }, PRI_KEY, { expiresIn: EXPIR })
					res.send(JSON.stringify({
						code: 1,
						msg: '登录成功',
						data: { 'token': token, 'openid': arr.openid }
					}))
				})

			})
		}
	})
})








module.exports = router	