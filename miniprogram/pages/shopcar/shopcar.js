// pages/shopcar/shopcar.js
const app = getApp()
function accAdd(arg1,arg2) {//精度矫正函数
	var r1, r2, m;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}
Number.prototype.add = function (arg){
	return accAdd(arg,this);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    totalPrice:0,
    isCartEmpty: false, // 购物车是否有商品
    hasAllSelected: false, // 是否全选
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
    cartList: [{
      //goodsList: [{
        id: 1112,
        merchantId: "111",
        title: '格力迷你静音台式电风扇',
        image: '',
        quantity: 4,
        price: 100000,
        isActivity: true,
        quantityUpdatable: false,
        hasSelected: false
    //  }]
    }/*{
      goodsList: [{
        id: 1111,
        merchantId: "111",
        title: '格力迷你静音台式电风扇',
        image: '/assets/images/cart_none_a.png',
        quantity: 4,
        price: 100000,
        isActivity: true,
        quantityUpdatable: false,
        hasSelected: false
      }]
    },*/
    
  ],
  totalPrice: 0,
},
/**
 * 计算商品总价格事件
 */
calculateTotalPrice() {
  let cartList = this.data.cartList;
  let totalPrice = 0;
  cartList.forEach(function (goods) {
      // console.log(goods);
      if (goods.hasSelected) {
        totalPrice = accAdd(totalPrice,goods.price * goods.quantity);//浮点数精度矫正
        totalPrice=parseFloat(totalPrice.toFixed(12))//四舍五入
      }
       console.log(totalPrice);
  })
  this.setData({
    totalPrice: totalPrice
  })
},

/**
 * 验证是否全选事件
 */
verifyHasAllSelected() {
  let hasAllSelected = true;
  let cartList = this.data.cartList;
  cartList.forEach(function (item) {
    if (!item.hasSelected) {
      hasAllSelected = false;
      return;
    }
  })
  this.setData({
    hasAllSelected: hasAllSelected,
  })
},

/**
 * 单个商品选择事件
 */
selectGoodsSingle(e) {
  let cartList = this.data.cartList;
  //const merchantId = e.currentTarget.dataset.merchantId;
  const goodsId = e.currentTarget.dataset.goodsid;
  console.log(e)
  cartList.forEach(function (goods) {
    //if (item.goodsList[0].merchantId === merchantId) {
        if (goods.id === goodsId) {
          const hasSelected = goods.hasSelected;
          
          goods.hasSelected = !hasSelected;
          
          return;
        }
      return;
    //}
  });
  this.setData({
    cartList: cartList,
  })
  this.calculateTotalPrice();
  this.verifyHasAllSelected();
},

/**
 * 商品数量减1事件
 */
minus(e) {
  console.log(e);
  let cartList = this.data.cartList;
  //const merchantId = e.currentTarget.dataset.merchantId;
  const goodsId = e.currentTarget.dataset.goodsId;
  let hasSelected;

  cartList.forEach(function (goods) {
        if (goods.id === goodsId) {
          if (goods.quantity <= 1) {
            wx.showToast({
              title: '商品数量少于1',
            })
          } else {
            goods.quantity -= 1;
          }
          hasSelected = goods.hasSelected;
          return;
        }
      return;
  //  }
  });
  this.setData({
    cartList: cartList,
  })
  if (hasSelected) {
    this.calculateTotalPrice();
  }
},

/**
 * 商品数量加1事件
 */
pluse(e) {
  console.log(e);
  let cartList = this.data.cartList;
 // const merchantId = e.currentTarget.dataset.merchantId;
  const goodsId = e.currentTarget.dataset.goodsId;
  let hasSelected;

  cartList.forEach(function (goods) {
        if (goods.id === goodsId) {
          if (goods.quantity >= 10) {
            wx.showToast({
              title: '数量超过10',
            })
          } else {
            goods.quantity += 1;
          }
          hasSelected = goods.hasSelected;
          return;
        }
      return;
   // }
  });
  this.setData({
    cartList: cartList,
  })
  if (hasSelected) {
    this.calculateTotalPrice();
  }

},

/**
 * 购物车全选事件
 */
selectAll(e) {
  let hasAllSelected = this.data.hasAllSelected;
  hasAllSelected = !hasAllSelected;
  let cartList = this.data.cartList;
  for (let i = 0; i < cartList.length; i++) {
    let item = cartList[i];
    item.hasSelected = hasAllSelected;
    item.hasSelected = hasAllSelected;
    let goodsList = item;
    for (let i = 0; i < goodsList.length; i++) {
      let goodsItem = goodsList[i];
      goodsItem.hasSelected = hasAllSelected;
    }
  }

  this.setData({
    hasAllSelected: hasAllSelected,
    cartList: cartList
  });
  this.calculateTotalPrice();
},

/**
 * 显示修改单个商品数量布局事件
 */
showUpdateQuantity(e) {
  console.log(e);
  const merchantId = e.currentTarget.dataset.merchantId;
  const goodsId = e.currentTarget.dataset.goodsId;

  this.showOrHideUpdateQuantity(merchantId, goodsId, true);
},

/**
 * 隐藏修改单个商品数量事件 
 */
hideUpdateQuantity(e) {
  console.log(e);
  const merchantId = e.currentTarget.dataset.merchantId;
  const goodsId = e.currentTarget.dataset.goodsId;

  this.showOrHideUpdateQuantity(merchantId, goodsId, false);
},

/**
 * 显示改商品数量对话框事件
 */
showUpdateQuantityDialog() {

},

/**
 * 显示或者隐藏修改商品数量布局事件
 */
showOrHideUpdateQuantity(merchantId, goodsId, quantityUpdatable) {
  let cartList = this.data.cartList;
  cartList.forEach(function (goods) {
      if (goods.id === goodsId) {
        goods.quantityUpdatable = quantityUpdatable;
        return;
      }
      return;
   // }

  });
  this.setData({
    cartList: cartList,
  })
},
 
     
  /**
   * 生命周期函数--监听页面加载
   */
  gotoDetail(e){
    let userStr = JSON.stringify(e.currentTarget.dataset.cart)
    console.log(e.currentTarget.dataset.cart)
      wx.navigateTo({
        url: '../detail/detail?cart='+userStr
      })
  },
  gotoOrder(e){
    console.log("gotoOrder")
    let cartgo1=[]
    for(var i=0;i<this.data.cartList.length;i++)
    {
      if(this.data.cartList[i].hasSelected==true)
      {
        cartgo1.push(this.data.cartList[i])
      }
    }
    let cartgo = JSON.stringify(cartgo1)
    console.log(cartgo)
      wx.navigateTo({
        url: '../../pages/order/order?cartList='+cartgo+"&total_price="+this.data.totalPrice
      })
  },
  onShow(options) {
    wx.cloud.callFunction({
      name:"selectShopCar",
      //云函数传值
      data:{
        openid:app.globalData.openid,
      },
      success:(res)=>{
        console.log(res)
        let i=res.result.list.length
        let cartList=[]
        for(var j=0;j<i;j++)
        {
          let data1={ //定义要添加进入的元素
            id: res.result.list[j].uapproval[0].goods_id,
            merchantId: "111",
            title: res.result.list[j].uapproval[0].goods_name,
            image: res.result.list[j].uapproval[0].image,
            quantity: 1,
            price: res.result.list[j].uapproval[0].price,
            isActivity: true,
            quantityUpdatable: false,
            hasSelected: false
          }
          
          cartList.push(data1)
          console.log(data1)
        }
        app.globalData.cartList=cartList
        this.setData({
          cartList:cartList
        })
        console.log("云函数调用成功！",this.data.cartList)
      },
      fail:(error) =>{
        console.log("云函数调用失败！",error)
      },
    })
    this.setData({
      totalPrice:0
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
  onLoad() {
    wx.cloud.callFunction({
      name:"selectShopCar",
      //云函数传值
      data:{
        openid:app.globalData.openid,
      },
      success:(res)=>{
        console.log(res)
        let i=res.result.list.length
        let cartList=[]
        for(var j=0;j<i;j++)
        {
          let data1={ //定义要添加进入的元素
            id: res.result.list[j].uapproval[0].goods_id,
            merchantId: "111",
            title: res.result.list[j].uapproval[0].goods_name,
            image: res.result.list[j].uapproval[0].image,
            quantity: 1,
            price: res.result.list[j].uapproval[0].price,
            isActivity: true,
            quantityUpdatable: false,
            hasSelected: false
          }
          
          cartList.push(data1)
          console.log(data1)
        }
        app.globalData.cartList=cartList
        this.setData({
          cartList:cartList
        })
        console.log("云函数调用成功！",this.data.cartList)
      },
      fail:(error) =>{
        console.log("云函数调用失败！",error)
      },
    })
    this.setData({
      totalPrice:0
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