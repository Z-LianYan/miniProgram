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
  },



  onChange(e) {
    // wx.authorize({scope: "scope.userInfo"})


    // wx.getSetting({
    //   success(res) {
    //     console.log("---",res);
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success () {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })



    this.setData({
      isChecked: !this.data.isChecked
    });
    // if(this.data.isChecked){
    //   console.log('radio发生change事件，携带value值为：', e.currentTarget.dataset.value)
    // }
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