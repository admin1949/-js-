/**
 * myajax 0.0.1
 * 接收一个可选参数参数baseurl，
 * 实现了一个简单的基于原生js的xmlhttprequest ajax方法，暴露了3个重要的函数，post和get和ajax
 */

function xl(url){
  this.baseUrl = url == undefined ? '' : url;
	let http = window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	
	/**
	 * 暴露一个序列化数据的函数
	 * 接收2个参数data必要的参数，待转换的数据，method可选参数，如果不传默认为post方式即字符串开始没有？
	 */
	
	this.stringify = function(data,method){
		if(typeof data ==='object'){
			let str = method === 'get' ? '?' : '';
			for( i in data){
				str += (i+'='+data[i]+'&')
			}
			return str;
		}
	}
	
	/**
	 * 私有一个函数用于处理当接收到数据时的回调
	 * _http.readyState 有4中状态 1-4 重点0开始发送；1发送成功还没接收；2；开始接收；3接收到一半还没接完 4接收完毕
	 * _http.status 服务器相应的状态码，常见的状态码 200成功，404未找到资源
	 * JSON.parse为将json字符串转换为json对象的函数，js原生函数
	 */
	
	let onstatuschange = function (_http,method,resolve,reject) {
		if(_http.readyState == 4){
			if(_http.status == 200){
				method.success(JSON.parse(_http.responseText))
			}else{
				method.error(JSON.parse(_http.readyState))
			}
		}
	}
	
	/**
	 * 暴露一个get函数
	 * 实现了一个XMLHttpRequest.get 的接口接收一个json参数，内容为url，data，成功的回调和失败的回调，
	 * 
	 * 待优化 完成一个遵循promise 规范的接口，返回一个promise的对象实现链式调用
	 */
		let	GET = get => { //小坑，用箭头函数将this保持不变
		http.open('GET',this.baseUrl+get.url+this.stringify(get.data,'get'))
		http.onreadystatechange = function(){
			onstatuschange(http,get);
		}
		http.send();
	}
	
	/**
	 * 实现了get方法的promise封装get接收json参数为url和data
	 * 返回了一个promise对象用于链式调用
	 */
	
	this.get = function(get){
		let a = new Promise((resolve,reject) => {
			// let xl = new xl('http://app.iushan.com');
			GET({
				url: get.url,
				data: get.data,
				success: function(data){
					 resolve(data)
				},
				error: function (data){
					reject(err)
				} 
			})
		})
		return a
	}
}