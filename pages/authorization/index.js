// pages/authorization/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getUserInfo: function(e) {
    console.log("哈哈哈哈哈😄",e)
    // // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   // hasUserInfo: true
    // })
    // this.onTrue();
    // let that = this;

    if(e.detail.userInfo){
      this.onChange();
    }else{
      this.onFasle();
    }

    // wx.getSetting({
    //   success(res) {
    //     console.log("---",res);
    //     if(res.authSetting['scope.userInfo']){
    //       console.log("已授权")
    //       that.onChange();
    //     }else{
    //       console.log("未授权")
    //       that.onFasle();
    //     }
    //   }
    // })


  },

  onChange:function() {
    console.log("改变")
    this.setData({
      isChecked: !this.data.isChecked
    });
  },

  onFasle:function(){
    this.setData({
      isChecked: false
    });
  },


  getPhoneNumber:function(e){
    console.log("e",e)
    if(!this.data.isChecked){
      wx.showToast({
        title: '请同意聚橙用户协议声明',
        icon: 'none'
      })
    }
  },

  onNavigateAgreement:function(){
    wx.navigateTo({url:"/pages/agreement/index"})
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