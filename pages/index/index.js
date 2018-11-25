import {
  fetch ,login
} from "../../utils/util.js"
//获取应用实例
const app = getApp()
Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    pn:1,
    isLoading: false,
    hasMore:true,
    loadDone:false
  },
  onLoad() {
    login()
    // this.getData()
    // this.getContent()
    Promise.all([this.getData(), this.getContent()]).then(() => {
      this.setData({
        hasMore:true,
        pn :1,
        loadDone:true
      })

    })
  },
  // 请求数据
  getData() {
    // 获取轮播图
    //写成Promise，后面刷新的时候同步使用
    new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        console.log(res);
        resolve();
        this.setData({
          swiperData: res.data,
          isLoading: false,
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false,
        })
      })
    })
  },
  getContent() {//获取书籍列表
    new Promise((resolve,reject)=>{
      this.setData({
        isLoading:true
      })
      fetch.get("/category/books").then(res => {
        console.log(res)
        resolve();
        this.setData({
          mainContent: res.data,
          isLoading:false
        })
      }).catch(err=>{
        isLoading: false;
        reject();
      })
    })
  },
  jump(e) {
    const id = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh: function() {
    // 刷新完成之后，需要获取页面的所有数据,getData(),getContent()
    //后面需要写一个完成刷新后就停止刷新的操作，所以上面这两个应该是相对同步完成，使用promise.all()方法
    Promise.all([this.getData(), this.getContent()]).then(() => {
      this.setData({
        hasMore:true,
        pn:1
      })
      wx.stopPullDownRefresh()
    })
  },
  getMoreContent(){
    return new Promise((resolve)=>{
      fetch.get("/category/books", { pn: this.data.pn }).then(res => {
        // console.log(res)
        let newArr = [...this.data.mainContent,...res.data]
        this.setData({
          mainContent: newArr,
        })
        resolve(res);
      })
    })
  },
  onReachBottom(){
    // console.log("more")
    if (this.data.hasMore){
        this.setData({
          pn: this.data.pn + 1,
        })
      this.getMoreContent().then(res=>{
          if(res.data.length < 2 ){
            this.setData({
              hasMore: false
            })
          }
        })
      }
  },
})