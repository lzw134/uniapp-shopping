// 登陆模块
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {
	query
} = require('../../db/conn.js')
//引入multer封装模块
const {
	good_file
} = require('../../config/good_file.js')
const {
	upload_file
} = require('../../config/upload_file.js')
//引入时间模块
const {
	time
} = require('../../config/date.js')
//引入封装的类
const entity_good = require('../../entity/entity_good.js')
//初始化死图片datas数据
let datas = []
// 加载主列表
router.get('/list', async (req, res) => {
	// 去查询banner列表
	let sql_select = "select * from  store_good"

	let result = await query(sql_select);

	let img = [];
	for (var i = 0; i < result.length; i++) {
		let imgs = JSON.parse(result[i].good_pic)
		img.push(imgs[0])
	}
	res.render('home/good', {
		result,
		img
	})


})

// 加载添加列表
router.get('/good_add', async (req, res) => {
	//加载商品分类
	let good_class = "select * from store_class where good_id = ?"

	let nesting = await query(good_class, [0]);
	res.render('home/good_add', {
		nesting
	})
})

router.get('/good_xiugai', async (req, res) => {
	//加载商品的信息进行回显
	let {
		id
	} = req.query

	let sql = "select * from store_good where id = ?"
	let good_class = "select * from store_class  where good_id = ?"


	let nesting = await query(good_class, [0]);
	let result = await query(sql, id);
	result = result[0]



	res.render('home/good_update', {
		result,
		nesting,

	})
})

//商品添加接口
router.post('/good_update', good_file.fields([{
	name: 'goods_pic',
	maxCount: 3
}]), async (req, res) => {
	//获取当前时间
	var str = time();

	let {
		id,
		good_name,
		good_describe,
		good_sales,
		old_price,
		new_price,
		good_address,
		good_flog,
		good_id,
		good_details
	} = req.body

	let sql_select_cache = "select * from store_img_cache";

    let sql_select_pic = "select good_pic from store_good where id = ?";
    let sql_select_img_cache = "select img_cache from store_good where id = ?";
	
		
	let cache_result = await query(sql_select_cache);
    
	let pic_result = await query(sql_select_pic,[id]);
    let img_cache_result = await query(sql_select_img_cache,[id]);
	
	pic_result = JSON.parse(pic_result[0].good_pic)
    img_cache_result = JSON.parse(img_cache_result[0].img_cache)
	
	/*数据库缓存清除*/
	if (cache_result.length != 0) {
		
		/*存入upload中的图片数据*/
		let img_cache = []
		
		for (var i = 0; i < cache_result.length; i++) {
			if (good_details.indexOf(cache_result[i].img) == -1) {
				fs.unlinkSync('./public' + cache_result[i].img)
			} else {
				img_cache.push(cache_result[i].img)
			}
		}
		let sql_delete_cache = "truncate table store_img_cache"
		await query(sql_delete_cache)
		img_cache = JSON.stringify(img_cache)


		var pic = []
		if (req.files.goods_pic!=null) {
			for (let i = 0; i < req.files.goods_pic.length; i++) {
				let good_pic = '/goods/' + req.files.goods_pic[i].filename
				pic.push(good_pic)
			}

			pic = JSON.stringify(pic)


			let sql_insert =
				"update  store_good set good_name= ?,good_describe = ?,good_pic = ?,good_sales = ?,old_price = ?,new_price = ?,good_address = ?,good_flog = ?,good_id = ?,good_details = ?,img_cache = ?,add_time = ? where id = ?";
			query(sql_insert, [good_name, good_describe, pic, good_sales, old_price, new_price, good_address, good_flog,
				good_id, good_details, img_cache, str, id
			]).then(data => {
				for(var i = 0;i<pic_result.length;i++){
					fs.unlinkSync('./public'+pic_result[i])
				}
				for(var i = 0;i<img_cache_result.length;i++){
					fs.unlinkSync('./public'+img_cache_result[i])
				}
				res.send('<script>alert("修改商品成功1");location.href="/admin/good/list"</script>')
			})
		} else {
			let sql_insert =
				"update  store_good set good_name= ?, good_describe = ? , good_sales = ?,old_price = ?,new_price = ?,good_address = ?,good_flog = ?,good_id = ?,good_details = ?,img_cache = ?,add_time = ? where id = ?";
			query(sql_insert, [good_name, good_describe, good_sales, old_price, new_price, good_address, good_flog, good_id,
				good_details, img_cache, str, id
			]).then(data => {
				for(var i = 0;i<img_cache_result.length;i++){
					fs.unlinkSync('./public'+img_cache_result[i])
				}
				res.send('<script>alert("修改商品成功2");location.href="/admin/good/list"</script>')
			})

		}


	} else {

		var pic = []
		if (req.files.goods_pic != null) {
			for (let i = 0; i < req.files.goods_pic.length; i++) {
				let good_pic = '/goods/' + req.files.goods_pic[i].filename
				pic.push(good_pic)
			}

			pic = JSON.stringify(pic)


			let sql_insert =
				"update  store_good set good_name= ?,good_describe = ?,good_pic = ?,good_sales = ?,old_price = ?,new_price = ?,good_address = ?,good_flog = ?,good_id = ?,good_details = ?,add_time = ? where id = ?";
			query(sql_insert, [good_name, good_describe, pic, good_sales, old_price, new_price, good_address, good_flog,
				good_id, good_details, str, id
			]).then(data => {
				for(var i = 0;i<pic_result.length;i++){
					fs.unlinkSync('./public'+pic_result[i])
				}
				res.send('<script>alert("修改商品成功3");location.href="/admin/good/list"</script>')
			})
		} else {
			let sql_insert =
				"update  store_good set good_name= ?, good_describe = ? , good_sales = ?,old_price = ?,new_price = ?,good_address = ?,good_flog = ?,good_id = ?,good_details = ?,add_time = ? where id = ?";
			query(sql_insert, [good_name, good_describe, good_sales, old_price, new_price, good_address, good_flog, good_id,
				good_details, str, id
			]).then(data => {
				res.send('<script>alert("修改商品成功4");location.href="/admin/good/list"</script>')
			})
		}
	}

	/*服务器缓存删除*/
	// else if (datas.length != 0) {
	// 	for (var i = 0; i < datas.length; i++) {
	// 		if (good_details.indexOf(datas[i]) == -1) {
	// 			fs.unlinkSync('./public' + datas[i])
	// 		}
	// 	}
	// 	datas = []
	// }
})


//商品添加接口
router.post('/good_insert', good_file.fields([{
	name: 'goods_pic',
	maxCount: 3
}]), async (req, res) => {
	//获取当前时间
	var str = time();

	let {
		good_name,
		good_describe,
		good_sales,
		old_price,
		new_price,
		good_address,
		good_flog,
		good_id,
		good_details
	} = req.body

	let sql_select_cache = "select * from store_img_cache";

	let cache_result = await query(sql_select_cache);

	/*存入upload中的图片数据*/
	let img_cache = []

	/*数据库缓存清除*/
	if (cache_result.length != 0) {
		for (var i = 0; i < cache_result.length; i++) {
			if (good_details.indexOf(cache_result[i].img) == -1) {
				fs.unlinkSync('./public' + cache_result[i].img)
			} else {
				img_cache.push(cache_result[i].img)
			}
		}
		let sql_delete_cache = "truncate table store_img_cache"
		await query(sql_delete_cache)
	}

	/*服务器缓存删除*/
	// else if(datas.length!=0){
	// 		for(var i = 0;i<datas.length;i++){
	// 			 if(good_details.indexOf(datas[i])==-1){
	// 				  fs.unlinkSync('./public'+datas[i])
	// 			 }
	// 		}
	// 		datas = []
	// 	}
	// }

	var pic = []

	for (let i = 0; i < req.files.goods_pic.length; i++) {
		let good_pic = '/goods/' + req.files.goods_pic[i].filename
		pic.push(good_pic)
	}

	pic = JSON.stringify(pic)
	img_cache = JSON.stringify(img_cache)


	let sql_insert =
		"insert into store_good (good_name,good_describe,good_pic,good_sales,old_price,new_price,good_address,good_flog,good_id,good_details,img_cache,add_time) value (?,?,?,?,?,?,?,?,?,?,?,?)";
	query(sql_insert, [good_name, good_describe, pic, good_sales, old_price, new_price, good_address, good_flog,
		good_id, good_details, img_cache, str
	]).then(data => {
		res.send('<script>alert("新增商品成功");location.href="/admin/good/list"</script>')
	})
})

//富文本图片返回接口
router.use('/img_insert', upload_file.any(), async (req, res) => {
	try {
		let imgs = [];
		for (var i = 0; i < req.files.length; i++) {
			let img = '/upload/' + req.files[i].filename
			datas.push(img)
			let sql_insert = "insert into store_img_cache (img) value (?)"
			await query(sql_insert, [img])
			imgs.push(img)
		}

		res.send({
			errno: 0,
			data: imgs
		})
	} catch (err) {
		console.log(err)
		return
	}
})

//商品删除接口
router.get('/good_delete', async (req, res) => {

	let {
		id
	} = req.query
	//接受数据库传输的值
	let img_result = '';
	//接受JSON转过来的数组
	let img_cache_arr = [];
	let good_pic_arr = [];
	/*根据id查询该具体信息*/
	let sql_select = "select img_cache,good_pic from store_good where id=?"
	/*将查询的结果赋值给页面*/
	img_result = await query(sql_select, [id]);
	img_cache_arr = JSON.parse(img_result[0].img_cache);
	good_pic_arr = JSON.parse(img_result[0].good_pic);
	/*根据id删除分类信息*/
	let sql_delete = "delete  from store_good where id = ?"

	let result = await query(sql_delete, [id]);

	if (result) {
		if (img_cache_arr.length != 0) {
			for (var i = 0; i < img_cache_arr.length; i++) {
				/*删除多张图:unlinkSync*/
				// fs.unlinkSync('./public'+arr[i])
				await fs.unlink('./public' + img_cache_arr[i], err => {

				})
			}
		}
		if (good_pic_arr.length != 0) {
			for (var i = 0; i < good_pic_arr.length; i++) {
				/*删除多张图:unlinkSync*/
				// fs.unlinkSync('./public'+arr[i])
				await fs.unlink('./public' + good_pic_arr[i], err => {

				})
			}
		}
		res.send('<script>alert("删除商品成功");location.href="/admin/good/list"</script>')
	}
})


//商品修改接口
router.get('/good_delete', async (req, res) => {

	let {
		id
	} = req.query
	//接受数据库传输的值
	let img_result = '';
	//接受JSON转过来的数组
	let arr = [];
	/*根据id查询该具体信息*/
	let sql_select = "select good_pic from store_good where id=?"
	/*将查询的结果赋值给页面*/
	img_result = await query(sql_select, [id]);
	arr = JSON.parse(img_result[0].good_pic);

	/*根据id删除分类信息*/
	let sql_delete = "delete  from store_good where id = ?"

	let result = await query(sql_delete, [id]);

	if (result) {
		if (arr.length != 0) {
			for (var i = 0; i < arr.length; i++) {
				/*删除多张图:unlinkSync*/
				// fs.unlinkSync('./public'+arr[i])
				await fs.unlink('./public' + arr[i], err => {

				})
			}
		}
		res.send('<script>alert("删除商品成功");location.href="/admin/good/list"</script>')
	}
})


//商品封装接口
// router.get('/good_text',(req,res)=>{
// 	let {good_name}  = req.query

// 	goods = new entity_good();
// 	goods.setgood_Name(good_name);



// 	console.log('获取的值为:'+goods.getgood_Name());


// })












module.exports = router
