// pages/confirm_order/confirm_order.js
const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
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
    var form_id = e.detail.formId;
    var that = this;
    var type = this.data.type;
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
        }
      })
    }
    wx.switchTab({
      url: '../shopcar/shopcar',
    })
  },
  //返回上一页
  onBack: function() {
    wx.navigateBack({
    })
 
  },
 gotoOrder(e){
   let cartList=[];
   
   cartList=this.data.orderList[parseInt(e.currentTarget.dataset.order)].cartList
   console.log(cartList)
   let cartgo = JSON.stringify(cartList)
      wx.navigateTo({
        url: '../okorder/okorder?cartList='+cartgo+"&total_price="+e.currentTarget.dataset.price
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var type = options.type;
    let openid=options.openid
    console.log(options)
    wx.cloud.callFunction({
      name:"selectOrder",
      data:{
        openid:app.globalData.openid,
      }, success:(res)=>{
        console.log(res.result.data)
        this.setData({
          orderList:res.result.data
        })
      }
    })
      
    },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
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