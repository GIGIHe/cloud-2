// pages/personal/personal.js
Page({
  data: {
    userInfo: {}//表示用户的信息
  },
  isShow:true,
  onLoad: function (options) {
    wx.getUserInfo({
      success: data => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo,
          isShow:false
        })
      }
    })
  },
  
})
  