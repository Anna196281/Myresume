var getXHR = null;
(function () {
    var list = [
        function () {
            //IE7+ 、标准浏览器
            return new XMLHttpRequest;
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxm12.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxm13.XMLHTTP");
        }
    ];
    var temp = null;
    for (var i = 0; i < list.length; i++) {
        var tempFn = list[i];
        try {
            temp = tempFn();
        } catch (e) {
            continue;
        }
        getXHR = tempFn;
        break;
    }
    if (!temp) {
        throw new Error("当前浏览器不支持Ajax");
    }
})();

var utils1={
    toJSON:function(str){
        return "JSON" in window ? JSON.parse(str):eval("("+str+")");
    },
    ajax:function(apiurl,callback){
        var _this=this;
        var xhr = getXHR();
        apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
        xhr.open("get", apiurl);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                var val = xhr.responseText;
                val=_this.toJSON(val);
                typeof callback === "function" ? callback(val):null;
            }
        };
        xhr.send();
    }
};