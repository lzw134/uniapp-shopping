/*封装multer*/

const fs = require('fs');

const multer = require('multer');

const path = require('path');

let good_file = multer({
	  //创建文件夹
	     storage:multer.diskStorage({
			 destination:function(req,file,cb){
				 let dir = path.join(__dirname,"../public/goods/");
				 if(!fs.existsSync(dir)){
					 fs.mkdirSync(dir,{recursive:true})
				 }
				 cb(null,dir)
			 },
			 filename:function(req,file,cb){
				 let  fileName = Date.now()+path.extname(file.originalname);
				 cb(null,fileName)
			 }
		 })
})

module.exports = {
	good_file
}