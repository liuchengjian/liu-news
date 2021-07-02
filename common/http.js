export default function $http(options){
	const{ url , data } = options
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name:url,
			data
		}).then((res)=>{
			const {result} = res;
			if(result.code===200){
				//.then
				reslove(result)
				console.log('请求的'+{url}+'数据:',JSON.stringify(result))
			}else{
				//catch
				reject(result)
			}
		}).catch((err)=>{
			//catch
			reject(err)
		})
	})
}