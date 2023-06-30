// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  return await db.collection("goods").where({	 	//collectionName 表示欲模糊查询数据所在collection的名
    goods_name:{								//goods_id表示欲模糊查询数据所在列的名
      $regex:'.*' + event.goods_name + '.*',		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
      $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
    }
  }).get()
}
