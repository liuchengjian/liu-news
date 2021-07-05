'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {name,page=1,pageSize=10} = event
	//聚合
	let matchObj = {}
	if(name!=='全部'){
		matchObj = {classify:name}
	}
	const list = await db.collection('article')
	.aggregate()
	.match(matchObj)
	.project({
		content:0
	})
	.skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	
	// const list = await db.collection('article')
	// .field({
	// 	content:false  //过滤 ture,只返回 false，不返回
	// })
	// .get()
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功',
		data:list.data
	}
};
