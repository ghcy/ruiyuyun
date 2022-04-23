var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();
Page({
  data: {
    categoryList: [],
    currentCategory: {},
    currentFoodsList: {},
    foodList:{},
    goodsNum:0,
    index:1,
    id:1
  },
  onLoad: function(options) {
    // this.getCatalog();
    //获取购物车中商品的数量以及商品的总金额
  },
  // 获取商品
  getCatalog: function() {
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // });
    util.request(api.CatalogList,{
      id:id
    }).then(function(res) {
      that.setData({
        categoryList: res.data.categoryList,
        currentCategory: res.data.currentCategory,
        foodlist:res.data.FoodList
      });
      wx.hideLoading();
    });
  },
  getCurrentCategory: function(id) {
    let that = this;
    util.request(api.CatalogCurrent, {
        id: that.data.id
      })
      .then(function(res) {
        that.setData({
          currentCategory: res.data.currentCategory,
          currentFoodsList: res.data.currentFoodsList
        });
      });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    if(app.globalData.switchIndex){
      this.setData({
        index:app.globalData.switchIndex,
      })
      console.log(this.data.index);
      console.log(app.globalData.switchIndex);
    };
   this.setData({
    goodsNum:app.globalData.cartNumber,
   });
   util.request(api.CartIndex).then(function (res) {
     this.setData({
      goodsNum:res.cartList,
     })
   })
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }
    this.getCurrentCategory(event.currentTarget.dataset.id);
  },
  switchTab:function (e) {
    if(e.target.id == "tangshi"){
      this.setData({
        index:1
      })
    };
    if(e.target.id == "ziqu"){
      this.setData({
        index:2
      })
    };
    console.log(index);
  },
  gotoCart:function () {
    wx.navigateTo({
      url: '/pages/newCart/newCart',
    });
  }
})