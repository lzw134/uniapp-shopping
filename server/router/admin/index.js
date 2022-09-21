// api下的index模块
const express  = require('express')
const router = express.Router()
//将login界面加载进来
const Login  = require('./login.js');
//将home界面加载进来
const Home = require('./home.js');
const Banner = require('./banner.js')
const Class = require('./class.js')
const Good = require('./good.js')
const Order = require('./order.js')



router.use('/home',Home)
router.use('/login',Login)
router.use('/banner',Banner)
router.use('/class',Class)
router.use('/good',Good)
router.use('/order',Order)
module.exports = router


// 二级路由
// router.post('/index',(req,res)=>{
   // console.log(req.body)
   // res.end('访问到了api下的index模块');
//      res.render('');
// })