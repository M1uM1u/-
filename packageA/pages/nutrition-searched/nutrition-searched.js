Page({
  data:{
    food:"",
    danbaizhi:0,
    zhifang:0,
    tanshui:0,
    nengliang:0,
    danbaizhiValue:0,
    zhifangValue:0,
    tanshuiValue:0,
  },

  onReady: function() {
    var that = this;
    var zhifangValue = parseInt(Number(that.data.zhifang)/(Number(that.data.danbaizhi)+Number(that.data.zhifang)+Number(that.data.tanshui))*100);
    var tanshuiValue = parseInt(Number(that.data.tanshui)/(Number(that.data.danbaizhi)+Number(that.data.zhifang)+Number(that.data.tanshui))*100);
    var danbaizhiValue = 100-zhifangValue-tanshuiValue;
    // console.log(danbaizhiValue);
    that.setData({ 
      danbaizhiValue:danbaizhiValue,
      zhifangValue:zhifangValue,
      tanshuiValue:tanshuiValue,
    });
    that.canvasRing = that.selectComponent("#canvasRing");
    that.canvasRing.showCanvasRing();
    that.canvasRing1 = that.selectComponent("#canvasRing1");
    that.canvasRing1.showCanvasRing();
    that.canvasRing2 = that.selectComponent("#canvasRing2");
    that.canvasRing2.showCanvasRing();
   },
  
  onLoad: function(options){
    const {food}=options;
    const {nengliang}=options;
    const {danbaizhi}=options;
    const {tanshui}=options;
    const {zhifang}=options; 
    // console.log(food);
    // console.log(nengliang);
    // console.log(danbaizhi);
    // console.log(tanshui);
    // console.log(zhifang);
    this.setData({ 
      food:options.food,
      nengliang:options.nengliang,
      danbaizhi:options.danbaizhi,
      tanshui:options.tanshui,
      zhifang:options.zhifang, 
    });
   },
})
