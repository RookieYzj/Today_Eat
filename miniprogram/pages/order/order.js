// pages/confirm_order/confirm_order.js
const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    goods_info: [], //商品信息
    cartList:[],
    password:'',
    showModal:false,
    goods_count: '', //商品件数
    sum_price: 0, //合计价格
    item: {
      iconfontBack: "icon-arrowleft",
      navigationBarTitle: "确认订单",
      statusBarHeight: app.globalData.statusBarHeight
    },
    statusBarHeight: app.globalData.statusBarHeight,
    type: '', //选项
    order_message: '', //订单留言
  },
  // 留言
  bindwaitMsg: function(event) {
    console.log(event.detail.value);
    this.setData({
      order_message: event.detail.value, // 订单留言
    })
  },
 
 
  /**
   * 支付订单
   */
  payOrder: function(orderHash, order_id) {
    var that = this;
    var order_hash = orderHash;
    console.log(order_hash)
    //呼起微信支付
    MBC.Ajax({
      url: api.getPayConfig,
      is_login: true,
      data: {
        hash: order_hash,
        platform: 'miniProgram',
        channel: 'weixin'
      },
      success: function(res) {
        wx.requestPayment({
          'timeStamp': res.result.parameters.timeStamp,
          'nonceStr': res.result.parameters.nonceStr,
          'package': res.result.parameters.package,
          'signType': 'MD5',
          'paySign': res.result.parameters.paySign,
          'success': function(res) {
            console.log(res);
            MBC.Ajax({
              url: api.payOrder,
              is_login: true,
              data: {
                hash: order_hash
              },
              success: function(res) {
                console.log(res)
                var status = res.result.status;
                if (status == 2) {
                  wx.showToast({
                    title: '支付成功',
                  });
                  wx.redirectTo({
                    url: '../orderInfo/orderInfo?order_id=' + order_id,
                  })
 
                } else {
                  wx.showToast({
                    title: '支付失败，请稍后刷新',
                  })
                }
 
              }
            })
          },
          'fail': function(res) {
            console.log(res);
            wx.redirectTo({
              url: '../orderInfo/orderInfo?order_id=' + order_id,
            })
          }
        })
      }
    })
 
  },
  //  提交订单
  bindSubmitOrder: function(e) {
    this.setData({
      showModal:true
    })
  },
  //返回上一页
  onBack: function() {
    wx.navigateBack({
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var type = options.type;
    let cartList=JSON.parse(options.cartList)
    this.setData({
      cartList:cartList
    })
    this.setData({
      sum_price:JSON.parse(options.total_price)
    })
      
    },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
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
      password:e.detail.value
    })
  },
  /**
  * 点击确定按钮获取input值并且关闭弹窗
  */
  zhifu(){
    let password;
    wx.cloud.callFunction({
      name:"selectUser",
      data:{
        openid:app.globalData.openid
      },success:(res)=>{
        password=res.result.data[0].password

        if(this.data.password==''){
          wx.showModal({
            title: '提示',
            content: '输入密码为空，请输入密码',
            showCancel:false,
          })
        }
        else if(this.data.password!=password)
        {
          wx.showModal({
            title: '提示',
            content: '密码错误，请重新输入',
            showCancel:false,
          })
        }
        else{
          wx.cloud.callFunction({
            name:"addOrder",
            data:{
             openid:app.globalData.openid,
             cartList:this.data.cartList,
             time:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8),
             sum_price:this.data.sum_price,
            },
            success:(res)=>{
             console.log(res)
             wx.cloud.callFunction({
               name:"moneyControl",
               data:{
                openid:app.globalData.openid,
                money:this.data.sum_price
               },success:(res)=>{
                 app.globalData.money-=this.data.sum_price
               }
             })
           }
         })
          for(var i=0;i<this.data.cartList.length;i++)
          {
      
             wx.cloud.callFunction({
               name:"deleteShopCar",
               data:{
                openid:app.globalData.openid,
                goods_id:this.data.cartList[i].id
               },
              success:(res)=>{
                console.log("提交订单成功")
                wx.showModal({
                  title: '提示',
                  content: '支付成功！✌',
                  showCancel:false,
                })
              }
            })
          }
          wx.switchTab({
            url: '../shopcar/shopcar',
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
  onShow: function(options) {
    var that = this;
    var goods_id = that.data.goods_id;
    var goods_num = that.data.goods_num;
    var type = that.data.type;
    var cart_ids = that.data.cart_ids;
    console.log(that.data.address_id);
    // if (type == 1) {
      
    // } else if (type == 2) {
      
    // }
    if (that.data.address_id){
      // 获取指定地址信息
      MBC.Ajax({
        url: api.getOne,
        is_login: true,
        data: {
          address_id: that.data.address_id
        },
        success: function (res) {
          that.setData({
            address_info: res.result.address_info
          })
        },
        fail: function (res) {
 
        }
      })
    }
  
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  }
})