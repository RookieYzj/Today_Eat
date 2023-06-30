// pages/icon/icon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid:'',
    name:'',
    showModel:false,
    showModelname:false,
    changepassword1:'',
    changepassword2:'',
    money:0,
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
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true

      })
    }
    wx.cloud.callFunction({
      name:"selectUser",
      data:{
        openid:this.data.openid
      },success:(res)=>{
      app.globalData.momey=res.result.data[0].money
      app.globalData.name=res.result.data[0].name
      this.setData({
      money:res.result.data[0].money,
      name:res.result.data[0].name
    })
    }
    })
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res0) => {
        console.log(res0.userInfo.nickName)
          wx.cloud.callFunction({
            name: 'quickstartFunctions',
            success: (res)=> {
              this.data.userInfo=res.userInfo
              app.globalData.openid=res.result.userInfo.openId
              this.setData({
                openid:app.globalData.openid
              })
              wx.cloud.callFunction({
                name:"selectUser",
                data:{
                  openid:res.result.userInfo.openId
                },success:(res1)=>{
                  if(res1.result.data.length==0)
                  {
                    wx.cloud.callFunction({
                      name:"addUser",
                      data:{
                        openid:res.result.userInfo.openId,
                        name:res0.userInfo.nickName,
                        password:'123456',
                        money:1000,
                      },success:(res11)=>{
                        this.setData({
                          name:res0.userInfo.nickName
                        })
                      }
                    })
                    app.globalData.momey=1000
                    this.setData({
                      money:1000
                    })
                  }
                  else{
                     app.globalData.momey=res1.result.data[0].money
                     app.globalData.name=res1.result.data[0].name
                     this.setData({
                      money:res1.result.data[0].money,
                      name:res1.result.data[0].name
                    })
                  }
                 
                }
              })
            },
            fail: function(error) {
              console.log("云函数调用失败！",error)
            },
          })
        this.setData({
          userInfo: res0.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  showmodelname(){
    this.setData({
      showModalname:true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  showmodel(){
    this.setData({
      showModal:true
    })
  },
  /**
  * 点击返回按钮隐藏
  */
  back:function(){
    this.setData({
      showModal:false
    })
  },
  /**
  * 获取input输入值
  */
  wish_put:function(e){
    this.setData({
      changepassword1:e.detail.value
    })
  },
  wish_put2:function(e){
    this.setData({
      changepassword2:e.detail.value
    })
  },
  /**
  * 点击确定按钮获取input值并且关闭弹窗
  */
  changename(){
    let password;
    wx.cloud.callFunction({
      name:"selectUser",
      data:{
        openid:app.globalData.openid
      },success:(res)=>{
        password=res.result.data[0].password

        if(this.data.changepassword1==''){
          wx.showModal({
            title: '提示',
            content: '输入密码为空，请输入密码',
            showCancel:false,
          })
        }
        else if(this.data.changepassword1!=password)
        {
          wx.showModal({
            title: '提示',
            content: '输入密码错误，请重新输入',
            showCancel:false,
          })
        }
        else if(this.data.changepassword2==null){
          wx.showModal({
            title: '提示',
            content: '输入新用户名为空，请输入新用户名',
            showCancel:false,
          })
        }
        else{
             wx.cloud.callFunction({
               name:"moneyControl",
               data:{
                 openid:app.globalData.openid,
                 name:this.data.changepassword2,
                 password:password,
                 money:0
               },success:(res)=>{
                 wx.showModal({
              title: '提示',
              content: '修改用户名成功！✌',
              showCancel:false,
            })
            app.globalData.name=this.data.changepassword2
            this.setData({
              name:this.data.changepassword2
            })
               }
             })
           this.setData({
            showModalname:false,
          })
        }
      }
    })
  },
  name:function(){
    let password;
    wx.cloud.callFunction({
      name:"selectUser",
      data:{
        openid:app.globalData.openid
      },success:(res)=>{
        password=res.result.data[0].password
        let name=res.result.data[0].name
        if(this.data.changepassword1==''){
          wx.showModal({
            title: '提示',
            content: '输入密码为空，请输入密码',
            showCancel:false,
          })
        }
        else if(this.data.changepassword1!=password)
        {
          wx.showModal({
            title: '提示',
            content: '输入旧密码错误，请重新输入',
            showCancel:false,
          })
        }
        else if(this.data.changepassword2==null){
          wx.showModal({
            title: '提示',
            content: '输入新密码为空，请输入新密码',
            showCancel:false,
          })
        }
        else{
             wx.cloud.callFunction({
               name:"moneyControl",
               data:{
                 openid:app.globalData.openid,
                 password:this.data.changepassword2,
                 name:name,
                 money:0
               },success:(res)=>{
                 wx.showModal({
              title: '提示',
              content: '修改支付密码成功！✌',
              showCancel:false,
            })
               }
             })
           this.setData({
            showModal:false,
          })
        }
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.cloud.callFunction({
      name:"selectUser",
      data:{
        openid:app.globalData.openid
      },success:(res)=>{
        console.log(res.result.data[0])
      app.globalData.momey=res.result.data[0].money
      this.setData({
      money:res.result.data[0].money,
    })
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