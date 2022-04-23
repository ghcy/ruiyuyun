var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();
Page({
  data: {
    categoryList: [],
    currentCategory: {},
    currentSubCategoryList: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    goodsNum:1,
    index:1
  },
  onLoad: function(options) {
   
    
    // this.getCatalog();
    //获取购物车中商品的数量以及商品的总金额
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  // 获取商品
  getCatalog: function() {
    let that = this;
    
    // wx.showLoading({
    //   title: '加载中...',
    // });
    util.request(api.CatalogList).then(function(res) {
      that.setData({
        categoryList: res.data.categoryList,
        currentCategory: res.data.currentCategory,
        currentSubCategoryList: res.data.currentSubCategory
      });
      wx.hideLoading();
    });
    util.request(api.GoodsCount).then(function(res) {
      that.setData({
        goodsCount: res.data
      });
    });

  },
  getCurrentCategory: function(id) {
    let that = this;
    util.request(api.CatalogCurrent, {
        id: id
      })
      .then(function(res) {
        that.setData({
          currentCategory: res.data.currentCategory,
          currentSubCategoryList: res.data.currentSubCategory
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
    }
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
  }
})