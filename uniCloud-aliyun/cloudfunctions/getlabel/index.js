'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// let label = await db.collection('label').get()
	const {user_id,type} = event
	let matchObj = {}
	if(type!=="all"){
		matchObj = {
			current:true
		}
	}
	//聚合
	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		current:$.in(['$_id',$.ifNull([userInfo.label_ids,[]])])
	})
	.match(matchObj)
	.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功',
		data:label.data
	}
};
