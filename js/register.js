//logo
var logo = document.getElementById("logo");
var em = document.getElementById("em");
logo.onmouseover = function () {
    em.style.visibility = "visible";
};
logo.onmouseout = function () {
    em.style.visibility = "hidden";
};
//我是猎头、我是企业HR 、手机猎聘
var lietou = document.getElementById("lietou");
var company = document.getElementById("company");
var phone = document.getElementById("phone");
lietou.onmouseover = function () {
    lietou.style.color = "white";
};
lietou.onmouseout = function () {
    lietou.style.color = "";
};
//我是企业
company.onmouseover = function () {
    company.style.color = "white";
};
company.onmouseout = function () {
    company.style.color = "";
};
//手机猎聘
phone.onmouseover = function () {
    phone.style.color = "white";
};
phone.onmouseout = function () {
    phone.style.color = "";
};


//搜索
var searchInp = document.getElementById("searchInp");
var searchList = document.getElementById("searchList");

//不管是获取焦点onfocus还是在里面编辑内容onkeyup，都是由内容显示，没内容隐藏
searchInp.onfocus = searchInp.onkeyup = function () {
    var val = this.value.replace(/(^ +| +$)/g, "");//获取文本框中的内容，并且去除他的首位空格
    searchList.style.display = val.length > 0 ? "block" : "none";
};

document.body.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    //->如果事件源是searchList下的a标签，我们让searchList隐藏，并且把当前点击这个a中的内容放到文本框中
    if (e.target.tagName.toLowerCase() == "a" && e.target.parentNode.parentNode.id == "searchList") {
        searchList.style.display = "none";
        searchInp.value = e.target.innerHTML;
        return;
    }
    // 如果事件源是文本框还需要单独处理
    //if(e.target.id=="searchInp"){
    //    return;
    //}
    searchList.style.display = "none";
};
//我们可以阻止一个容器中某些特殊性的元素，让其不在委托的范围内：我们只需要把不需要委托的阻止冒泡传播即可
searchInp.onclick = function (e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
};




//注册
var userEmail = document.getElementById("userEmail"),
    spanEmail = document.getElementById("spanEmail"),
    password = document.getElementById("password"),
    spanPW = document.getElementById("spanPW"),
    code = document.getElementById("code"),
    spancode = document.getElementById("spancode");

//1、邮箱验证
function checkEmail() {
    var val = userEmail.value.replace(/(^ +| +$)/g, "");
    var reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (val.length === 0 || !reg.test(val)) {
        userEmail.className = "error";
        spanEmail.style.display = "block";
        spanEmail.innerHTML = val.length === 0 ? "请输入您的邮箱~~" : "您输入的邮箱不符合格式~~";
        return false;
    }
    userEmail.className = null;
    spanEmail.innerHTML = "";
    return true;
};
userEmail.onkeyup = checkEmail;

//2、密码验证
function checkpassWord() {
    var passwordValue = password.value;
    var passwordRegex = /^\w{6,10}$/;
    if (!passwordValue || !passwordRegex.test(passwordValue)) {
        //password.className = "error";
        spanPW.style.display = "block";
        spanPW.innerHTML = passwordValue.length === 0 ? "请输入您的密码~~" : "密码必须6-16位~~";
        return false;
    }
    //password.className = null;
    spanPW.innerHTML = "";
    return true;
};
password.onkeyup = checkpassWord;

//5、验证码
var codeDiv = document.getElementById("codeDiv");
var area = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";
function getCode() {
    var str = "";
    for (var i = 0; i < 4; i++) {
        var ran = Math.round(Math.random() * 61);
        str += area[ran];
    }
    codeDiv.innerHTML = str;
}
getCode();
codeDiv.onclick = getCode;

function checkcode() {
    var codeValue = code.value;
    if (codeValue.length < 4)
        return false;
    if (codeValue != codeDiv.innerText) {
        spancode.style.display = "block";
        spancode.innerHTML = "";
        spancode.innerHTML = "验证码错误~~";
        getCode();
        return false;
    }
    spancode.innerHTML = "";
    return true;
};
code.onkeyup = checkcode;

//同意协议
var btn = document.getElementById("submit");
btn.onclick = function () {
    var bEmail = checkEmail();
    var bPassWord = checkpassWord();
    var bCode = checkcode();

    //如果,每个上面的每个对象,验证成功,则还回true
    if (bEmail && bPassWord && bCode) {
//                window.open("http://www.jd.com");
        window.location.replace("http://localhost:63342/WebstormProjects/untitled/%E5%AE%9E%E6%88%98/%E7%8C%8E%E8%81%98%E7%BD%911/index.html");
    }
};


//轮播图效果

var banner = document.getElementById("banner");
var bannerInner = document.getElementById("bannerInner");
var bannerTip = document.getElementById("bannerTip");

var ulList = bannerInner.getElementsByTagName("ul");
//liList=bannerInner.getElementsByTagName("img"),
oList = bannerTip.getElementsByTagName("li");


//1、ajax
var jsonDate = null;
+function () {
    var xhr = new XMLHttpRequest;
    xhr.open("get", "json/banner2.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonDate = utils.formatJSON(xhr.responseText);
            console.log(jsonDate);
        }
    };
    xhr.send(null);
}();


//2、字符串拼接
function connect(index) {
    var str = "", str2 = "";
    //for(var i=0;i<jsonDate.length-1;i++){
    var curDate = jsonDate[index];
    str += "<ul>";
    for (var k = 0; k < curDate.length; k++) {
        str += "<li>";
        str += "<a href='javascript:;'>";
        str += "<img src='' trueImg='" + curDate[k]["img"] + "'/>";
        str += "</a>";
        str += "</li>";
    }
    str += "</ul>";
    oList[index].className = 'bg';
    //index === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>";
    //}
    bannerInner.innerHTML = str;
    //bannerTip.innerHTML=str2;
};
step = 0;
connect(0);
lazyImg();
setBanner();
//3、图片延迟加载
window.setTimeout(lazyImg, 1000);
function lazyImg() {
    for (var i = 0; i < ulList.length; i++) {
        imagList = ulList[i].getElementsByTagName("img");
        for (var j = 0; j < imagList.length; j++) {
            +function (j) {
                var curImg = imagList[j];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                curImg.onmouseover = function () {
                    curImg.style.opacity = 1;
                };
                curImg.onmouseout = function () {
                    curImg.style.opacity = 0.7;
                };
                oImg.onload = function () {
                    curImg.src = oImg.src;
                    curImg.style.display = "block";
                    oImg = null;
                };
            }(j);
        }
        if (i == 0) {
            var curLi = ulList[i];
            utils.css(curLi, "zIndex", 1);
            zhufengAnimate(curLi, {opacity: 1}, 2000);
        }
    }
}

//4、实现自动轮播
var interval = 3000, autoTimer = null, step = 1;
autoTimer = window.setInterval(autoMove, interval);
function autoMove() {
    if (step == 6) {
        step = 0;
    }
    connect(step);
    lazyImg();
    setBanner();
    step++;
}

function setBanner() {
    for (var i = 0; i < ulList.length; i++) {
        var curUl = ulList[i];
        if (i == step) {
            utils.css(curUl, "zIndex", 1);
            zhufengAnimate(curUl, {opacity: 1}, 1000, function () {
                var curUlSib = utils.siblings(this);
                for (var k = 0, len = curUlSib.length; k < len; k++) {
                    utils.css(curUlSib[k], "opacity", 0);
                }
            });
            continue;
        }
        utils.css(curUl, "zIndex", 0);
    }
    for (i = 0; i < oList.length; i++) {
        i === step ? utils.addClass(oList[i], "bg") : utils.removeClass(oList[i], "bg");
    }
}


//5、鼠标悬停
banner.onmouseover = function () {
    window.clearInterval(autoTimer);
};
//banner.onmouseout=function(){
//    autoTimer=window.setInterval(autoMove,interval);
//};

//6、焦点切换
+function () {
    for (var i = 0; i < oList.length; i++) {
        var curLi = oList[i];
        curLi.index = i;
        curLi.onmouseover = function () {
            step = this.index;
            connect(step);
            lazyImg();
            setBanner();
        }
    }
}();








