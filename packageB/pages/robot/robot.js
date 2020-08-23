// packageB/pages/robot/robot.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     myName:'',//用户名
//     chatMsg:[],//对话框中的聊天内容
//     userMessage:'',//输入框中的内容
//     toView: ''//对话框中最后一条会话id，将对话框定位滑动到新消息位置
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     let _this = this;
//     let myName = options.username; //获取用户名
//     _this.setData({
//       myName: myName
//     })
//   },
//   bindMessage: function (e) {
//     this.setData({
//       userMessage: e.detail.value
//     })
//   },
//   sendMessage: function () {
//     if (!this.data.userMessage.trim()) return;
//     let date = new Date();
//     let _this = this;
//     let chatMsg = _this.data.chatMsg;
//     let msgData = {
//       username: _this.data.myName,
//       data: _this.data.userMessage,
//       type:1,
//       mid: 'chat_' + date.getTime()
//     };
//     chatMsg.push(msgData);
//     _this.setData({
//       chatMsg: chatMsg
//     });
//     _this.receiveMsg(msgData.data);
//     setTimeout(function () {
//       _this.setData({
//         toView: chatMsg[chatMsg.length - 1].mid
//       })
//     }, 100)
//     _this.setData({
//       userMessage: ''
//     });
//   },
//   receiveMsg: function (queryValue) {
//     let date = new Date();
//     let _this = this;
//     let msgData = {};
//     let chatMsg = _this.data.chatMsg;
//     wx.request({
//       url: '获取问题答案的接口',
//       data: {
//         action: 'search',
//         queryValue: queryValue
//       },
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (ret) {
//         let searchValue = ret.data;
//         if(!searchValue.data.searchResList.length){
//           msgData = {
//             username: '吃啥好鸭',
//             data: [{id:0,title:'没有找到相关数据',dizhi:''}],
//             type: 2,
//             mid: 'chat_' + date.getTime()
//           };
//         } else {
//           msgData = {
//             username: '吃啥好鸭',
//             data: searchValue.data.searchResList,
//             type: 2,
//             mid: 'chat_' + date.getTime()
//           };
//         };
//         chatMsg.push(msgData);
//         _this.setData({chatMsg: chatMsg});
//         setTimeout(function () {
//           _this.setData({
//             toView: chatMsg[chatMsg.length - 1].mid
//           })
//         }, 100);
//       },
//       fail: function () {
//         msgData = {
//           username: '吃啥好鸭',
//           data: [{ id: 0, title: '答案走丢了，请稍后再试', dizhi: '' }],
//           type: 2,
//           mid: 'chat_' + date.getTime()
//         };
//         chatMsg.push(msgData);
//         _this.setData({ chatMsg: chatMsg });
//       }
//     })
//   },
//   toWebview:function(event){
//     let url = event.currentTarget.dataset.webUrl;
//     url ?
//       wx.navigateTo({
//         url: '../../pages/web-view/web-view?url=' + url,
//       })
//       : wx.showToast({
//         title: "无详情页",
//         icon: 'none'
//       })
//   }
// })

var app = getApp();
var that;
var chatListData = [];

Page({
  data: {
    askWord: '',
    userInfo: {},
    chatList: [],
  },
  onLoad: function () {
    that = this;
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      });
    });
  },
  onReady: function () {
    //问候语
    setTimeout(function () {
      that.addChat('如果有饮食健康相关的问题，请向我提问吧', 'l');
    }, 1000);
  },
  sendChat: function (e) {
    let word = e.detail.value.ask_word ? e.detail.value.ask_word : e.detail.value;//支持两种提交方式
    that.addChat(word, 'r');
    //请求api获取回答
    app.req('post', 'openapi/api', {
      'data': { 'info': word, 'loc': '杭州', 'userid': '123', 'username': '吃啥好鸭'},
      'success': function (resp) {
        that.addChat(resp.text, 'l');
        if (resp.url) {
          that.addChat(resp.url, 'l');
        }
      },
    });

    //清空输入框
    that.setData({
      askWord: ''
    });
  },
  //新增聊天列表
  addChat: function (word, orientation) {
    let ch = { 'text': word, 'time': new Date().getTime(), 'orientation': orientation };
    chatListData.push(ch);
    that.setData({
      chatList: chatListData
    });
  }
})


