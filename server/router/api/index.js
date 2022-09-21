// api下的index模块
const express  = require('express')
const router = express.Router()
const Banner = require('./banner.js')
const Class  =require('./class.js')
const Good = require('./good.js')
const Login = require('./login.js')
const Shop = require('./shop.js')
const Collect = require('./collect.js')
const Set = require('./set.js')
const Search = require('./search.js')
const Address = require('./address.js')
const Pay = require('./pay.js')
const Order = require('./order.js')
const Liuyan = require('./liuyan.js')


/*引入解密*/
const expressJwt = require('express-jwt')
const {PRI_KEY} =  require('../../config/MD5_STR.js')


// 二级路由
router.get('/',(req,res)=>{
  console.log(req.body)
  res.end('访问到了api下的index模块')
})


router.use('/banner',Banner)
router.use('/class',Class)
router.use('/good',Good)
router.use('/login',Login)
router.use('/search',Search)
/*白名单解密jwt*/
/*
router.use(expressJwt({
	secret:PRI_KEY
})).unless({
	push:['api/login/login']
})
*/
router.use(expressJwt({secret:PRI_KEY}))
router.use('/shop',Shop)
router.use('/collect',Collect)
router.use('/set',Set)
router.use('/address',Address)
router.use('/pay',Pay)
router.use('/order',Order)
router.use('/liuyan',Liuyan)
module.exports = router