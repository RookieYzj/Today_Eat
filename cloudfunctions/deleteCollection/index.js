// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 找到集合user中name为Tom的数据并remove删除
    // 因为数据库删除是异步操作，所以要加await
    return await db.collection('collection').where({
      openid:event.openid,
      goods_id: event.goods_id
    }).remove()
  } catch (err) {
    console.error(err)
  }
}
