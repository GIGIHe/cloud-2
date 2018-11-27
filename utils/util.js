
const baseUrl = 'https://m.yaojunrong.com'
const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {'content-type': 'application/json'}
      if(token){
       header.token = token 
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          resolve(res.data);
          let t = res.header.Token || res.header.token
          if (t){
          wx.setStorageSync('token',t)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })

  },
  get(url, data) {
    return this.http(url, 'GET', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  },
  delete(url,data){
    return this.http(url,'delete',data)
  }
}
const login = () => {
  wx.login({
    success(res) {
      console.log('code',res.code)
      fetch.post("/login", {
        code: res.code,
        appid: "wxcfdb77c030f98476",
        secret: "b14d8a585e75e7fc1525fb690a890f8f"
      }).then(res=>{
          console.log('res',res)
      }) 
    }
  })
}
// exports.fetch = fetch;
// exports.login = login
module.exports = {
  fetch,
  login
}