function public(url){
   this.baseUrl = (url == undefined ? this.baseUrl = 'http://app.iushan.com' : url);
//    this.showurl= function(){
// 	   alert(this.baseUrl);
//    }
/**
 * post方式
 */
	this.post = function(url,data,callback){
		$.ajax({
			type:"post",
			url:this.baseUrl + url,
			async:true,
			data: data,
			success:function(data){
				callback(data)
			},
			error: function(err){
				alert('参数码错误')
			}
		})
	};
	
	/**
	 * get方式
	 */
	
	this.get = function(url,data,callback){
		$.ajax({
			type:'get',
			url: this.baseUrl + url,
			async: true,
			data:data,
			success: function(data){
				callback(data)
			},
			error: function(err){
				alert(err)
			}
		})
	}
	
	/**
	 * 获取传入页面的参数
	 */
	
	this.geturl = function(){
		let url = window.location.search;
		var obj = new Object();
		if(url.indexOf('?') != -1){
			let str = url.substr(1);
			let strs = str.split('&');
			for(let i = 0; i < strs.length; i++){
				num = strs[i].indexOf('=');
					if (num > 0) {
						const id = strs[i].substring(0, num);
						const value = strs[i].substr(num + 1);
						obj[id] = value
					}
			}
		}
		return obj;
	};
	
	/**
	 * 改变手机格式，隐藏中间4位数
	 */
	
	this.change_tel = function(tel){
		let arr = tel.split(''),arr1 = [];
		for(let i = 0; i < arr.length; i++){
			if(i > 2 && i < 7){
				arr1[i] = '*';
			}else{
				arr1[i] = arr[i];
			}
		}
		return arr1.join('')
	};
	
	/**
	 * 限制输入为min-max
	 * 之间的整数
	 */
	
	this.change_num = function(num, min, max){
		if(num == null || num < min){
			//console.log('change to '+min);
			return min;
		}
		if(typeof num != 'number'){
			//console.log('change to number');
			num = num.replace(/[^\d]/g,'');
			if(num > max){
				//console.log('change to '+max);
				return max;
			}
			return num;
		}
		if(num > max){
			//console.log('change to '+max);
			return max;
		}
	}
	
	/**
	 * 跳转页面，接收2个参数1：目标地址，2：待发送的参数
	 */
	
	this.move_to = function(url,obj){
		if(obj){
			//console.log(JSON.stringify(obj))
			let str = '?'
			for(var i in obj){
				str += (i+'='+obj[i]+'&')
				//console.log(i+'  '+obj[i]);
			}
			location.href = url+str;
		}
	}
	/**
	 * 处理返回的订单json
	 */
	this.order = function(data){
		let obj = new Object();
		let arr = [];
			for ( i in data ){
				obj['order'] = data[i].order_no;
				obj['from'] = data[i].sender_name;
				obj['to'] = data[i].receiver_name;
				obj['total_fee'] = data[i].total_fee;
				obj['bonus'] = data[i].bonus;
				obj['courier_uid'] = data[i].courier_uid;
				obj['courier_name'] = data[i].courier_name;
				obj['send_pass'] = data[i].send_pass;
				obj['order_status'] = data[i].order_status;
				obj['sender_address'] = data[i].sender_address
				obj['receiver_address'] = data[i].receiver_address
				arr.push(obj);
				obj = {};
			}
		return arr;
	}
	
	/**
	 * js节流
	 */
	this.throttle = function (fn, delta, context) {
		var safe = true;
		console.log(1212)
		return function() {
			var args = arguments;
			
			if(safe) {
			fn.call(context, args)
			
			safe = false
			
			setTimeout(function() {
				safe = true
			}, delta)
			}
		}
	}
	
	/**
	 * js去抖
	 */
	this.debounce = function (fn, delta, context) {
		let timeoutID = null;
		
		return function() {
			if(timeoutID) {
			clearTimeout(timeoutID);
			}
			
			let args = arguments;
			
			timeoutID = setTimeout(function() {
			fn.apply(this, args);
			}, delta);
			
		}
	}
}