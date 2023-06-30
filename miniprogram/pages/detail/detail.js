// pages/goods1/goods1.js
// index/details.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_shoucang: 0,
      goods_id: 1,
      collection:false,
      goods_title: "商品标题1",
      goods_price: '100',
      goods_yunfei: 0,
      goods_kucun: 100,
      goods_xiaoliang: 1,
      content: '商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情',
      goods_img: '',
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
  },


  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addcollection(){
    wx.cloud.callFunction({
      name:"addCollection",
      data:{
        openid:app.globalData.openid,
        goods_id:this.data.goods_id,
      }
    })
    this.setData({
      collection:true
    })
  },
  deletecollection(){
    wx.cloud.callFunction({
      name:"deleteCollection",
      data:{
        openid:app.globalData.openid,
        goods_id:this.data.goods_id,
      }
    ,success:(res)=>{
      this.setData({
        collection:false
      })
      console.log(false)
    }
  })
  },
  onLoad: function (options) {
    this.setData({
      goods_id:JSON.parse(options.cart).id,
      goods_title:JSON.parse(options.cart).title,
      goods_price:JSON.parse(options.cart).price,
      goods_img:JSON.parse(options.cart).image,
    })
    wx.cloud.callFunction({
      name:"selectCollection",
      data:{
        openid:app.globalData.openid,
        goods_id:JSON.parse(options.cart).id
      },success:(res)=>{
        if(res.result.data.length!=0)
        {
          this.setData({
          collection:true
        })
        }
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
