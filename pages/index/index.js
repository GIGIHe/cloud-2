import { fetch } from "../../utils/util.js"
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
    isLoading:false
  },
  onLoad() {
    this.getData()
    this.getContent()
  },
  // 请求数据
  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get('/swiper').then(res => {
      console.log(res)
      this.setData({
        swiperData:res.data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false,
      })
    })
  },
  getContent(){
    fetch.get("/category/books").then(res=>{
      // console.log(res)
      this.setData({
        mainContent:res.data
      })

    })
  },
  jump(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    }) 
  }
}
)
