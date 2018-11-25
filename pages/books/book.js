// pages/books/book.js
import {fetch} from "../../utils/util.js"
// get错误就出现在没有引入fetch
const app = getApp();
Page({
  data: {
    //article将会用来存储towxml数据
    article: {},
    titleId: "",
    bookId: "",
    catalog: [],
    font: 40,
    isShow: false,
    isLoading: false,
    index:"",
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },
  getData() {
    this.setData({
      isLoading: true,
     
    })
  // 显示文章内容
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      //将markdown转化为towxml数据
      // let data = app.towxml.toJson(res.data.article.content, 'markdown');
      console.log(res)
      this.setData({
        article: res.data.article.content,
        title: res.data.title,
        index: res.data.article.index,
         isLoading: false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false,
      })
    })
  },
  // 获取文章目录
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalog: res.data
      })
    })
  },
  // 切换目录显示与否
  toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })

  },
  
  handleGet(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    this.setData({
      titleId: id,
      isShow:false
    })
    this.getData()
  },
  // 字体变大
  handleAdd(){
    this.setData({
      font:this.data.font+2
    })
  },
  // 字体变小
  handleReduce() {
    if (this.data.font <= 24) {
  wx.showModal({
    title: '温馨提示',
    content: '字体太小会影响您的视力',
    showCancel:false
  })
    }else{
      this.setData({

        font: this.data.font - 2
      })
    }
    
  },
  // 前一页
  prev() {
    let catalog = this.data.catalog
    if(this.data.index-1<0){
      wx.showToast({
        title: '已是第一章',
      })
    }else{
      this.setData({
        titleId: catalog[this.data.index - 1]._id,
      })
    }
    this.getData()
  },
  // 后一页
  next(){
    let catalog = this.data.catalog
    if(catalog[this.data.index+1]){
      this.setData({
        titleId:catalog[this.data.index+1]._id
      })
      this.getData()
    }
    else{
      wx.showToast({
        title: '已完结',
      })
    }
  },
  onShareAppMessage: function() {

  }
})