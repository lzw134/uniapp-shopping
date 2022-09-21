

function entity_good(){
	let good_name;
	let store_id;
	let good_describe;
	let goods_pic;
	let old_price;
	let new_price;
	let good_address;
	let good_flog;
	let good_details;
	let add_time;
	this.constructor = function(good_name,store_id,good_describe,goods_pic,old_price,new_price,good_address,good_flog,good_details,add_time){
		 good_name = good_name; 
		 store_id =  store_id; 
		 good_describe = good_describe; 
		 goods_pic = goods_pic; 
		 old_price  = old_price; 
		 new_price = new_price;
		 good_address = good_address;
		 good_flog = good_flog;
		 good_details = good_details;
		 add_time = add_time;
	}
	this.setgood_Name=function (Name){
	     good_name = Name;  
	 },
	this.getgood_Name=function (){
		return good_name;
	 },
	this.setstore_id=function (store_id){
	     store_id = store_id;  
	 },
	this.getstore_id=function (){
		return store_id;
	 },
	this.setgood_describe=function (store_id){
	     store_id = store_id;  
	 },
	this.getstore_id=function (){
		return store_id;
	 }
}

module.exports = entity_good;