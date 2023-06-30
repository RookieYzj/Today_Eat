const app=getApp()
import eventUtil from"../core/utils/event-util";Component({properties:{columnGap:{type:String,value:"20rpx"}},data:{data:[],leftData:[],rightData:[]},attached(){this._init()},pageLifetimes:{show(){this._init()}},methods:{_init(){wx.lin=wx.lin||{},wx.lin.renderWaterFlow=(t=[],e=!1,a)=>{if("[object Array]"!==Object.prototype.toString.call(t))return console.error("[data]参数类型错误，渲染失败"),!1;this.setData({data:t}),
this.setData({leftData:[]}),this.setData({rightData:[]}),
e&&(this.data.leftData=[],this.data.rightData=[]),this._select(t,e).then(()=>{a&&a()}).catch(t=>{console.error(t)})}},_select(t,e){const a=wx.createSelectorQuery().in(this);return this.columnNodes=a.selectAll("#left, #right"),new Promise(a=>{this._render(t,0,e,()=>{a()})})},_render(t,e,a,i){(t.length>e||a)&&0!==this.data.data.length?this.columnNodes.boundingClientRect().exec(h=>{const r=h[0];this.data.leftHeight=r[0].height,this.data.rightHeight=r[1].height,this.data.leftHeight<=this.data.rightHeight||a?
this.data.leftData.push(t[e]):this.data.rightData.push(t[e]),this.setData({leftData:this.data.leftData,rightData:this.data.rightData},()=>{this._render(t,++e,!1,i)})}):i&&i()},
onTapItem(t){//点击事件
  eventUtil.emit(this,"linitemtap",{item:t.currentTarget.dataset.item},
  console.log(t.currentTarget.dataset.item),//确定商品是哪个
  wx.cloud.callFunction({
    name:"selectSuggest",
    data:{
      openid:app.globalData.openid,
      goods_id:t.currentTarget.dataset.item.goods_id,
    },success:(res)=>{
      console.log(res)
      if(res.result.data.length==0)
      {
        wx.cloud.callFunction({
          name:"addSuggest",
          data:{
            openid:app.globalData.openid,
            goods_id:t.currentTarget.dataset.item.goods_id,
          },success:(res)=>{
            console.log("有新的喜欢啦！")
          }
        })
      }
      else
      {
        wx.cloud.callFunction({
          name:"suggestControl",
          data:{
            openid:app.globalData.openid,
            goods_id:t.currentTarget.dataset.item.goods_id
          },success:(res)=>{
            console.log("推荐值+1")
          }
        })
      }
    }
  }),
  wx.cloud.callFunction({
    name:"selectShopCar",
    //云函数传值
    data:{
      openid:app.globalData.openid,
    },
    success:(res)=>{
      var t1=true;
      console.log(res.result)
      for(var i=0;i<res.result.list.length;i++)
      {
        if(t.currentTarget.dataset.item.goods_id==res.result.list[i].uapproval[0].goods_id)
        {
          t1=false;
          break;
        }
      }
      if(t1==true)
      {
        wx.cloud.callFunction({
          name:"addShopCar",
          //云函数传值
          data:{
            openid:app.globalData.openid,
            goodsid:t.currentTarget.dataset.item.goods_id,
            goodsprice:t.currentTarget.dataset.item.delCount,
            goodsimages:t.currentTarget.dataset.item.image
          },
          success:(res)=>{
            
            console.log("云函数调用成功！",res)
          },
          fail:(error) =>{
            console.log("云函数调用失败！",error)
          },
        })
      }
      else
      {
        wx.showToast({
          title: '菜品已经在购物车里面啦，不要重复加入噢!OvO',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
      
    },
    fail:(error) =>{
      console.log("云函数调用失败！",error)
    },
  }),
)}


}});