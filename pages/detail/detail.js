// pages/detail/detail.js
import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookData: {},
    isLoading: false,
    isCollect: false,
   
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
    // this.getEnshrine()
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
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
// 收藏图书
  handleCollect(){
  // 判断是否收藏
    if (!this.data.isCollect){
      console.log(this.data.bookId)
      fetch.post('/collection',{bookId:this.data.bookId}).then((res)=>{
        console.log(res)
       this.setData({
         isCollect: true
       })
       wx.showToast({
         title: '收藏成功',
       })
     })
   }else{
      fetch.delete(`/collection/${this.data.bookId}`).then((res)=>{
        console.log(res)
        this.setData({
          isCollect: false
        })
        wx.showToast({
          title: '取消收藏',
        })
      })
   }
    
  },





  // 收藏--------------
  // getEnshrine() {
  //   fetch.get(`/collection?pn=1&size=10`).then((res) => {
  //     res.data.forEach(item => {
  //       if (item.bookData._id == this.data.bookId) {
  //         this.setData({
  //           isEnshrine: true,
  //         })
  //       }
  //     })

  //   })
  // },


  onShareAppMessage: function(res) {
    return {
      title: this.data.bookData.title,
      path: `/pages/detail/detail?id=${this.data.bookId}`,
      imgUrl: this.data.bookData.data.img
    }
  }
})