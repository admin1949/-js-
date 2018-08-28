var p = new Promise((resolve,reject) => {
	setTimeout( () => {
		console.log('执行完成');
		resolve('ok')
	},3000)
}).then(data => {
	console.log(data);
	return 'data'//返回了一个字符串
}, err => {
	alert(err)
})
.then(data => {
	alert(data)
})