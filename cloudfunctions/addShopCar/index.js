// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('shopcar').add({
    data:{
        user_id:event.openid,
        goods_id:event.goodsid,
        goods_price:event.goodsprice,
        goods_images:event.goodsimages,
        number:event.number
    },
    success(res){
        console.log(res)
    },
    fail:console.error
})

}
