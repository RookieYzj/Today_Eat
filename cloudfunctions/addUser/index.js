// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('user').add({
    data:{
        openid:event.openid,
        password:event.password,
        image:event.image,
        name:event.name,
        money:event.money
    },
    success(res){
        console.log(res)
    },
    fail:console.error
})

}
