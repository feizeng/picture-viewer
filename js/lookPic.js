var num = 0;//旋转角度
var data = {
  "drag":false
};
$(function(){
  $(".picLook").click(function(){
    var src = $(this).attr("href");
    var html = "<img id='bigImg' src='" + src +"'/>";
    var turn = $(".turn");//旋转按钮
    var dom = $(".cloneImg");//放大的图片容器
    if(turn.size() == 0){
      $("#lightbox").append('<div class="turn"><a href="javascript:;" id="left0">左转90°</a><a href="javascript:;" id="right0">右转90°</a></div>');
    }
    if(dom.size() == 0){
      $(".lb-outerContainer").append('<div class="cloneImg">'+html+'</div>')
    }else{
      dom.html(html).css({
        "left":0,
        "top":0
      });
    }
  });
})
$("body").on("mousedown","#left0",function(e){
    num += 90;
    if(num > 360){
      num = 90;
    }
    $(".lb-outerContainer").css({
      "transform":"rotate("+ num +"deg)"
    });
});
$("body").on("mousedown","#right0",function(e){
    num -= 90;
    if(num < -360){
      num = -90;
    }
    $(".lb-outerContainer").css({
      "transform":"rotate("+ num +"deg)"
    });
});
$("body").on("mousewheel",".lb-container",function(e){
  var bigImg = $(".cloneImg");
  if(bigImg.is(":hidden")){
    bigImg.show();
  }
});
$("body").on("mousewheel",".cloneImg",function(e){
  var $this = $(this);
  var wid = parseInt($this.children("img").width());
  var boxwid = parseInt($(".lb-image").width());
  var left = parseInt($this.css("left"));
  var top = parseInt($this.css("top"));
  if(e.deltaY < 0 ){
    wid -= e.deltaFactor;
    if(wid < boxwid){
      wid = boxwid
    }
    $this.children("img").width(wid);
    if(left < 0){
      var gomove = left+e.deltaFactor;
      if(gomove < 0){
        $this.css("left",gomove);
      }else{
        $this.css("left",0);
      }
    }
    if(top < 0){
      var gomove = top+e.deltaFactor
      if(gomove < 0){
        $this.css("top",gomove);
      }else{
        $this.css("top",0);
      }
    }
  }else if(e.deltaY > 0){
    wid += e.deltaFactor
    if(wid > 5000){
      return false
    }
    $this.children("img").width(wid);
  }
})
$("body").on("mouseleave",".lb-outerContainer",function(e){
  var bigImg = $(".cloneImg");
  if(bigImg.is(":visible")){
    //bigImg.hide();
  }
})
$("body").on("mousedown",".cloneImg",function(e){
  e.preventDefault();
  data.thiswid = parseInt($(this).width());
  data.boxwid = parseInt($(".lb-outerContainer").width());
  data.thishigh = parseInt($(this).height());
  data.boxhigh = parseInt($(".lb-outerContainer").height());
  data.maxmoveX = data.thiswid - data.boxwid;
  data.maxmoveY = data.thishigh - data.boxhigh;
  data.mousepositionX = e.pageX;
  data.mousepositionY = e.pageY;
  data.oldTop = parseInt($(this).css("top"));
  data.oldLeft = parseInt($(this).css("left"));
  data.obj = $(this);
  data.drag = true;
  data.direction = num;
}).mousemove(function(e){
  if(data.drag){
    var obj = {
      "maxmoveX":-data.maxmoveX,
      "maxmoveY":-data.maxmoveY
    }
    if(data.direction == 180 || data.direction == -180){
      var moveX = data.oldLeft + parseInt(data.mousepositionX - e.pageX);
      var moveY = data.oldTop + parseInt(data.mousepositionY - e.pageY);
      obj.moveX = moveX;
      obj.moveY = moveY;
      gomove(obj);
    }else if(data.direction == 90 || data.direction == -270){
      var moveX = data.oldLeft + parseInt(e.pageY - data.mousepositionY);
      var moveY = data.oldTop + parseInt(data.mousepositionX - e.pageX);
      obj.moveX = moveX;
      obj.moveY = moveY;
      obj.fx = 0;
      gomove(obj);
    }else if(data.direction == 270 || data.direction == -90){
      var moveX = data.oldLeft + parseInt(data.mousepositionY - e.pageY );
      var moveY = data.oldTop + parseInt(e.pageX - data.mousepositionX);
      obj.moveX = moveX;
      obj.moveY = moveY;
      obj.fx = 0;
      gomove(obj);
    }else{
      var moveX = data.oldLeft + parseInt(e.pageX - data.mousepositionX);
      var moveY = data.oldTop + parseInt(e.pageY - data.mousepositionY);
      obj.moveX = moveX;
      obj.moveY = moveY;
      gomove(obj);
    }
  }
});
$(document).mouseup(function(e){
  data.drag = false;
})
function gomove(dect){
  //console.log(dect);
  if(dect.moveX < dect.maxmoveX || dect.moveX > 0){
    return false
  }else{
    if(dect.fx == 0){
      if(dect.moveY < dect.maxmoveY || dect.moveY > 0){
        return false
      }else{
        data.obj.css("top",dect.moveY)
      }
    }else{
      data.obj.css("left",dect.moveX)
    }
  }
  if(dect.moveY < dect.maxmoveY || dect.moveY > 0){
    return false
  }else{
    if(dect.fx == 0){
      if(dect.moveX < dect.maxmoveX || dect.moveX > 0){
        return false
      }else{
        data.obj.css("left",dect.moveX);
      }
    }else{
      data.obj.css("top",dect.moveY);
    }
  }
}