// pages/detail/detail.js
import {fetch} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookData: {},
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({ 
      bookId: options.id
    })
    this.getData()
  },
  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        bookData: res,
        isLoading: false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })
  },
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})