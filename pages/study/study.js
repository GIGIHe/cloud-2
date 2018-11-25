// pages/study/study.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getData()
  },
  getData(){
    fetch.get('/readList').then(res=>{
      console.log(res)
      this.setData({
        arr:res.data
      })
    })
  },
  goRead(e){
    const id = e.currentTarget.dataset.id
    const bookId = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/books/book?id=${id}&bookId=${bookId}`,
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