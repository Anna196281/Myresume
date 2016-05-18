var change_city = document.getElementById("change_city");
var city = document.getElementById("city");
change_city.onmouseover = function () {
    change.style.color = "white";
};
change_city.onmouseout = function () {
    change.style.color = "";
};
var flag = true;
change_city.onclick = function () {
    if (flag) {
        city.style.display = "block";
        city.style.zIndex = 10;
        flag = !flag;
    } else {
        city.style.display = "none";
        city.style.zIndex = 0;
        flag = !flag;
    }
};

//点击切换城市
var clearfix=document.getElementById("clearfix");
var oLis=clearfix.getElementsByTagName("a");
var citys=document.getElementById("citys");
for(var i=0;i<oLis.length;i++){
    var curLi=oLis[i];
    curLi.index=i;
    curLi.onclick=function(){
        citys.innerHTML=oLis[this.index].innerHTML;
    }
}


//轮播图
var banner=document.getElementById("banner");
var bannerInner=utils.firstChild(banner);
var bannerTip=utils.children(banner,"ul")[0];
var divList=bannerInner.getElementsByTagName("div");
var imgList=bannerInner.getElementsByTagName("img");
var oList=bannerTip.getElementsByTagName("li");

//1、ajax
var jsonDate=null;
+function(){
    var xhr=new XMLHttpRequest;
    xhr.open("get","json/banner.txt",false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState ===4 && /^2\d{2}$/.test(xhr.status)){
            jsonDate=utils.formatJSON(xhr.responseText);
            console.log(jsonDate);
        }
    };
    xhr.send(null);
}();



//2、字符串拼接
+function(){
    var str="",str2="";
    for(var i=0;i<jsonDate.length;i++){
        var curDate=jsonDate[i];
        str+="<div><img src='' trueImg='" + curDate["img"] + "'/></div>";
        i === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>";
    }
    bannerInner.innerHTML=str;
    bannerTip.innerHTML=str2;
}();


//3、图片延迟加载
window.setTimeout(lazyImg,1000);
function lazyImg(){
    for(var i=0;i<imgList.length;i++){
        +function(i){
            var curImg=imgList[i];
            var oImg=new Image;
            oImg.src=curImg.getAttribute("trueImg");
            oImg.onload=function(){
                curImg.src=oImg.src;
                curImg.style.display="block";
                if(i==0){
                    var curDiv=curImg.parentNode;
                    utils.css(curDiv,"zIndex",1);
                    zhufengAnimate(curDiv,{opacity:1},500);
                }
                oImg=null;
            }
        }(i);
    }
}


//4、实现自动轮播
var interval=3000, autoTimer=null, step=0;
autoTimer=window.setInterval(autoMove,interval);
function autoMove(){
    if(step==(jsonDate.length-1)){
        step=-1;
    }
    step++;
    setBanner();
}

function setBanner(){
    for(var i=0;i<divList.length;i++){
        var curDiv=divList[i];
        if(i==step){
            utils.css(curDiv,"zIndex",1);
            zhufengAnimate(curDiv,{opacity:1},200,function(){
                var curDivSib=utils.siblings(this);
                for(var k= 0,len=curDivSib.length;k<len;k++){
                    utils.css(curDivSib[k],"opacity",0);
                }
            });
            continue;
        }
        utils.css(curDiv,"zIndex",0);
    }
    for(i=0;i<oList.length;i++){
        i===step ?utils.addClass(oList[i],"bg"):utils.removeClass(oList[i],"bg");
    }
}


//5、鼠标悬停
banner.onmouseover=function(){
    window.clearInterval(autoTimer);
};
banner.onmouseout=function(){
    autoTimer=window.setInterval(autoMove,interval);
};

//6、焦点切换
+function(){
    for(var i= 0;i<oList.length;i++){
        var curLi=oList[i];
        curLi.index=i;
        curLi.onclick=function(){
            step=this.index;
            setBanner();
        }
    }
}();



//鼠标移上去变颜色
//var search_link=document.getElementById("search_link");
//var aList=search_link.getElementsByTagName("a");
//for(var i=0;i<aList.length;i++){
//    var cura=aList[i];
//    cura.index=i;
//    cura.onmouseover=function(){
//        cura.style.color="red";
//    };
//}


//进入按钮鼠标移上去加红色边框
var btn_enter=document.getElementById("enter");
btn_enter.onmouseover=function(){
    btn_enter.style.border="1px solid red";
};
btn_enter.onmouseout=function(){
    btn_enter.style.border="";
};



//


