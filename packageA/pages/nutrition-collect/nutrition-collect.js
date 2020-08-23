Page({
  onReady: function() {
    var that = this;
    that.canvasRing = that.selectComponent("#canvasRing");
    that.canvasRing.showCanvasRing();
    that.canvasRing1 = that.selectComponent("#canvasRing1");
    that.canvasRing1.showCanvasRing();
    that.canvasRing2 = that.selectComponent("#canvasRing2");
    that.canvasRing2.showCanvasRing();
   },
})
