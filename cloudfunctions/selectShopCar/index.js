// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  return await db.collection('shopcar').aggregate()
  .lookup({
    from:"goods", //把tb_user用户表关联上
    localField: 'goods_id', //购物车的关联字段
    foreignField: 'goods_id', //商品的关联字段
    as: 'uapproval' //匹配的结果作为uapproval相当于起个别名
  }).match({
    user_id:event.openid
  }).end()
}
