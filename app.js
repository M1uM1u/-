const AV=require('./libs/av-core-min');
const adapters=require('./libs/leancloud-adapters-weapp');

AV.setAdapters(adapters);
AV.init({
  appId:'qKT9668uXDHYpGtRImOcX34r-gzGzoHsz',
  appKey:'H3Tj75D8SNDgI9zEWK5dQTsr',
  serverURLs:"https://qkt9668u.lc-cn-n1-shared.com"
});

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  req: function (method, url, arg) {
    let domian = 'http://www.tuling123.com/', data = { 'key': '9f46e119411f4695a01c11b0a0d5dcef' }, dataType = 'json';
    let header = { 'content-type': 'application/x-www-form-urlencoded' };

    if (arg.data) {
      data = Object.assign(data, arg.data);
    }
    if (arg.header) {
      header = Object.assign(header, arg.header);
    }
    if (arg.dataType) {
      dataType = arg.dataType;
    }

    let request = {
      method: method.toUpperCase(),
      url: domian + url,
      data: data,
      dataType: dataType,
      header: header,
      success: function (resp) {
        console.log('response content:', resp.data);

        let data = resp.data;

        typeof arg.success == "function" && arg.success(data);
      },
      fail: function () {
        wx.showToast({
          title: '请求失败,请稍后重试',
          icon: 'none',
          duration: 2000
        });

        typeof arg.fail == "function" && arg.fail();
      },
      complete: function () {
        typeof arg.complete == "function" && arg.complete();
      }
    };
    wx.request(request);
  }

})