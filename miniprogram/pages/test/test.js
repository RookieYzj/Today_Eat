// pages/icon/icon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('false') && wx.canIUse('false') ,// 如需尝试获取用户信息可改为false
    list:[
      {
        pagePath:"/pages/index/index",
        text:"首页",
        iconPath:"/icons/首页1.jpg",
        selectedIconPath:"/icons/首页2.jpg"
    },
    {
        pagePath:"/pages/message/message",
        text:"消息",
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
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          wx.cloud.callFunction({
            name: 'quickstartFunctions',
            success: (res)=> {
              console.log("云函数调用成功！",res.result.userInfo.openId)
              this.data.userInfo=res.userInfo
              this.data.openid=res.result.userInfo.openId
              wx.cloud.callFunction({
                name:"register",
                //云函数传值
                data:{
                  openid:res.result.userInfo.openId,
                  time:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8),
                  price:10.2
                },
                success:(res)=>{
                  console.log("云函数调用成功！",res)
                },
                fail:(error) =>{
                  console.log("云函数调用失败！",error)
                },
              })
            },
            fail: function(error) {
              console.log("云函数调用失败！",error)
            },
          })
        this.setData({
          hasUserInfo: true
        })
      }
    })
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