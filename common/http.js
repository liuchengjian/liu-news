export default function $http(options){
	const{ url , data } = options
	const dataObj = {
		user_id:'5fba655c74defa0001ae5cb4',//5fba655c74defa0001ae5cb4
		...data
	}
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name:url,
			data:dataObj
		}).then((res)=>{
			const {result} = res;
			if(result.code===200){
				//.then
				reslove(result)
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