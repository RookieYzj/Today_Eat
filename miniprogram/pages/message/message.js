// pages/message.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:['你有点爱吃的！','你爱吃的！','你很爱吃的！','你非常爱吃的！','你最爱吃的！'],
    list:[
      {
        pagePath:"/pages/index/index",
        text:"首页",
        iconPath:"/icons/首页1.jpg",
        selectedIconPath:"/icons/首页2.jpg"
    },
    {
        pagePath:"/pages/message/message",
        text:"猜你想吃",
        iconPath:"/icons/消息1.jpg",
        selectedIconPath:"/icons/消息2.jpg"
    },
    {
        pagePath:"/pages/shopcar/shopcar",
        text:"购物车",
        iconPath:"/icons/购物车1.jpg",
        selectedIconPath:"/icons/购物车2.jpg"
     },
     {
          pagePath:"/pages/icon/icon",
          text:"我的",
          iconPath:"/icons/我的1.jpg",
          selectedIconPath:"/icons/我的2.jpg"
     }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   
  },
  point(){
    wx.cloud.callFunction({
      name:"selectSuggest",
      data:{
        openid:app.globalData.openid
      },success:(res)=>{
        console.log(res)
        let cartList=[];
        let y=0;
        for(var i=0;i<res.result.data.length&&y<5;i++)
        {
          y++;
          console.log(res.result.data[i].goods_id)
          wx.cloud.callFunction({
          name:"selectGoods_name",
          data:{
            goods_id:res.result.data[i].goods_id
          },success:(res)=>{
            console.log(res)
            cartList.push(res.result.data[0].goods_name)
            console.log(this.data.cartList)
            this.setData({
              cartList:cartList
            })
          }
          
        })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})