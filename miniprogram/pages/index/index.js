// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const app=getApp();
Page({
  data: {
    showUploadTip: false,
    demo:[],
    selectgoods:'',
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
    ],
   },
    //执行点击事件
 formSubmit: function (e) {
  //获取表单所有name=keyword的值
  var formData = e.detail.value.keyword;
  console.log(formData)
  //显示搜索中的提示
  wx.showLoading({
   title: '搜索中',
   icon: 'loading'
  })
  wx.cloud.callFunction({
    name:"mohuSelectGoods",
    data:{
      goods_name:formData
    },success:(res)=>{
      console.log(res.result.data)
      
      this.setData({
        demo:res.result.data,
        selectgoods:res.result.data
      }) 
      wx.lin.renderWaterFlow(res.result.data, false ,()=>{
        console.log("111")
      })
    }
  })
    //搜索成功后，隐藏搜索中的提示
    wx.hideLoading();
 },
   onLoad(options) {
  },
  onShow(){
    wx.cloud.callFunction({
      name:'selectGoods'
    }).then(res=>{
      this.setData({
        demo:res.result.data
      }) 
    wx.lin.renderWaterFlow(this.data.demo, false ,()=>{
    console.log('渲染成功')
  })
  }) 
  }
});


