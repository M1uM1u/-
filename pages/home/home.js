const app=getApp();
const AV=require('../../libs/av-core-min');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // arr: [
    //   "../../pictures/lunbo1.jpg",
    //   "../../pictures/lunbo2.jpg",
    //   // "../../imgs/3.png"
    // ],
    // username:'',
    // password:''
    
    imageItems: [{
      id: 1,
      imgsrc: "../../pictures/lunbo1.jpg",
      // link: "http://www.test.com/id=1"
    }, {
      id: 2,
      imgsrc: "../../pictures/lunbo2.jpg",
      // link: "http://www.test.com/id=2"
    }],
    info:"",
    score:122
  },

  inputUsername(e){
    this.setData({
      username:e.detail.value,
    })
  },
  inputPassword(e){
    this.setData({
      password:e.detail.value,
    })
  },
  login(){
    wx.navigateTo({
      url: '../message/message?message='+this.data.username,
    })
  },
  register(){
    const{
      username,
      password,
    }=this.data;
    const user=new AV.User();
    if(username) user.set({username});
    if(password) user.set({password});
    user.save().then(()=>{
      wx.showToast({
        title: '注册成功',
        icon:'success'
      });
    }).catch(error=>{
      wx.showToast({
        title: error.message,
        icon:'none'
      })
    });
  },

  questionButton:function(event){
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },
 recommendButton:function(event){
    wx.switchTab({
      url: '/pages/recommend/recommend',
    })
  },
  recordButton:function(event){
    wx.switchTab({
      url: '/pages/record/record',
    })
  },
  searchButton:function(event){
    wx.navigateTo({
      url: '/packageA/pages/search/search',
    })
  },
  activityButton:function(event){
    wx.navigateTo({
      url: '../../packageC/pages/activity/activity',
    })
  },
  assistantButton:function(event){
    wx.navigateTo({
      url: '/packageB/pages/robot/robot',
    })
  },
})