var util = require('../../../utils/util.js')
var app = getApp()

Page({
  data:{
    currentTab: 0,
    swipeIndex: 0,
    itemCurrent1: 0,
    itemIndex1: 0,
    itemCurrent2: 0,
    itemIndex2: 0,
    itemCurrent3: 0,
    itemIndex3: 0,
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: true,

    list1: [{
    title: '每日问答',
    title2:'8月1日-8月31日  1111人参与',
    title3:'即将开始',
    img: '../../pictures/activity1.jpg',
    url: '../../../pages/home/home'
    },
    {
      title: '八月饮食健康打卡挑战',
      title2:'8月1日-8月31日  1111人参与',
      title3:'即将开始',
      img: '../../pictures/activity2.jpg',
      url: '../../../pages/home/home'
    },
    {
      title: '八月饮食健康打卡挑战',
      title2:'8月1日-8月31日  1111人参与',
      title3:'即将开始',
      img: '../../pictures/activity3.jpg',
      url: '../../../pages/home/home'
    },
    {
      title: '八月饮食健康打卡挑战',
      title2:'8月1日-8月31日  1111人参与',
      title3:'即将开始',
      img: '../../pictures/activity4.jpg',
      url: '../../../pages/home/home'
    }
    ],
    list2: [{
      title: '八月早餐组队打卡挑战',
      title2:'8月1日-8月31日  1111人参与',
      title3:'即将开始',
      img: '../../pictures/activity1.jpg',
      url: '../../../pages/home/home'
      },
      {
        title: '八月不吃夜宵打卡挑战',
        title2:'8月1日-8月31日  1111人参与',
        title3:'即将开始',
        img: '../../pictures/activity2.jpg',
        url: '../../../pages/home/home'
      },
      {
        title: '八月饮食健康打卡挑战',
        title2:'8月1日-8月31日  1111人参与',
        title3:'即将开始',
        img: '../../pictures/activity3.jpg',
        url: '../../../pages/home/home'
      },
      {
        title: '八月饮食健康打卡挑战',
        title2:'8月1日-8月31日  1111人参与',
        title3:'即将开始',
        img: '../../pictures/activity4.jpg',
        url: '../../../pages/home/home'
      }
      ]
  },
    

  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    console.log('debugbindcange')
    var that = this;
    that.setData({
      swipeIndex: e.detail.current
    });
  },
  swiperItemChange1: function(e) {
    var that = this;
    that.setData({
      itemIndex1: e.detail.current
    });
  },
  swiperItemChange2: function(e) {
    var that = this;
    that.setData({
      itemIndex2: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {
    var that = this;
    if (this.data.swipeIndex === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  itemSwich1: function(e) {
    var that = this;
    if (this.data.itemIndex1 === e.currentTarget.dataset.current1) {
      return false;
    } else {
      that.setData({
        itemIndex1: e.currentTarget.dataset.current1,
        itemCurrent1: e.currentTarget.dataset.current1
      })
    }
  },
  itemSwich2: function(e) {
    var that = this;
    console.log(e)
    if (this.data.itemIndex2 === e.currentTarget.dataset.current2) {
      return false;
    } else {
      that.setData({
        itemIndex2: e.currentTarget.dataset.current2,
        itemCurrent2: e.currentTarget.dataset.current2
      })
    }
  },
  
  /**
   * 滑动item绑定事件
   */
  swiperTrans: function(e) {
    var that = this;
    var dx = e.detail.dx
    if (this.data.flag4 && (this.data.flag3) && (dx >= 50) && (dx < 100)) {
      console.log('debug')
      that.data.flag4 = false
      this.setData({
        currentTab: that.data.swipeIndex + 1,
      })
    }
    if (this.data.flag4 && (this.data.flag1) && (dx <= -50) && (dx > -100)) {
      that.data.flag4 = false
      this.setData({
        currentTab: that.data.swipeIndex - 1,
      })
    }
  },

  itemTouchLeftMove: function(e) {
    this.data.flag1 = true;
  },

  itemTouchLeftEnd: function(e) {
    this.data.flag1 = false;
    this.data.flag4 = true;
  },

  itemTouchRightMove: function(e) {
    this.data.flag3 = true;
  },

  itemTouchRightEnd: function(e) {
    this.data.flag3 = false;
    this.data.flag4 = true;
  },

  //   list: [{
  //     title: '八月饮食健康打卡挑战',
  //     title2:'8月1日-8月31日  1111人参与',
  //     title3:'即将开始',
  //     img: '../../pictures/activity1.jpg',
  //     url: '/pages/home/home'
  //   },
  //   {
  //     title: '八月饮食健康打卡挑战',
  //     title2:'8月1日-8月31日  1111人参与',
  //     title3:'即将开始',
  //     img: '../../pictures/activity2.jpg',
  //     url: '/pages/home/home'
  //   },
  //   {
  //     title: '八月饮食健康打卡挑战',
  //     title2:'8月1日-8月31日  1111人参与',
  //     title3:'即将开始',
  //     img: '../../pictures/activity3.jpg',
  //     url: '/pages/home/home'
  //   },
  //   {
  //     title: '八月饮食健康打卡挑战',
  //     title2:'8月1日-8月31日  1111人参与',
  //     title3:'即将开始',
  //     img: '../../pictures/activity4.jpg',
  //     url: '/pages/home/home'
  //   }
  // ]},
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  }
})