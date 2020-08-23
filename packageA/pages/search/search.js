Page({
  data: {
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
    FoodName:"",
    FoodList:[],

    foodsListAte:[
      {
        id:0,
        foods_logo:"../../pictures/apple.jpg",
        foods_word1:"苹果",
        foods_word2:"53.0千卡/100g",
      },
      {
        id:1,
        foods_logo:"../../pictures/coke.jpg",
        foods_word1:"可口可乐",
        foods_word2:"42.0千卡/100g",
      }
    ],
    foodsListCollect:[
      {
        id:0,
        foods_logo:"../../pictures/xiaolongxia.jpg",
        foods_word1:"小龙虾",
        foods_word2:"93.0千卡/100g",
      },
      {
        id:1,
        foods_logo:"../../pictures/chicken.jpg",
        foods_word1:"炸鸡",
        foods_word2:"224.0千卡/100g",
      }
    ],
    // FOOD:app.globalData.F[0],
  },
  /** 
   * 滑动切换tab 
   */

  onLoad: function () {
    // var app=getApp();
    var that = this;
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('food').get({
      success: function (res) {
        // console.log("RIGHT");
        // console.log(res.data);
        that.setData({ 
          FoodList: res.data, 
        });
      },
      fail:function (res) {
        console.log("ERROR");
        console.log(res);
      }
    })
  },

  bindChange: function(e) {
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
  swiperItemChange3: function(e) {
    var that = this;
    that.setData({
      itemIndex3: e.detail.current
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
  itemSwich3: function(e) {
    var that = this;
    if (this.data.itemIndex3 === e.currentTarget.dataset.current3) {
      return false;
    } else {
      that.setData({
        itemIndex3: e.currentTarget.dataset.current3,
        itemCurrent3: e.currentTarget.dataset.current3
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

  FoodInput: function(e){
    this.setData({
      FoodName: e.detail.value
    })
  },

  onReady: function(){
    
  },

  searchbtnClick: function(e){
    var that = this;
    // console.log(this.data.FoodName);
    const db = wx.cloud.database(); 
    db.collection('food').where({	 
      food:{							
        $regex:'.*' + this.data.FoodName + '.*',		
        $options: 'i'						
      },
    }).get({
      success: function (res) {
        // console.log("RIGHT");
        console.log(res.data);
        that.setData({ 
          FoodList: res.data, 
        });
      },
      fail:function (res) {
        console.log("ERROR");
      }
    })
  }
})

