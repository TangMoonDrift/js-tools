let tools = {
    //对象深度克隆
    deepClone: function (target, origin) {
        var tar = target || {};
        for (var prop in origin) {
            if (origin.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(origin[prop]) === '[object Object]' && typeof origin[prop] !== null) {
                    tar[prop] = {};
                    deepClone(tar[prop], origin[prop]);
                } else if (Object.prototype.toString.call(origin[prop]) === '[object Array]') {
                    tar[prop] = [];
                    deepClone(tar[prop], origin[prop]);
                } else {
                    tar[prop] = origin[prop];
                }
            }
        }
        return tar;
    },

    //类型判断
    _typeof: function (target) {

    },

    //数组去重
    uniqueArray: function (target) {
        if (Object.prototype.toString.call(target) !== '[object Array]') {
            alert('请输入数组');
            return false;
        }
        var tempObj = {},
            newArr = [],
            len = target.length;
        for (var i = 0; i < len; i++) {
            if (!tempObj[target[i]]) {
                tempObj[target[i]] = i + '';
                newArr.push(target[i]);
            }
        }
        return newArr;
    },

    //数组冒泡排序
    bubbleSort: function (arr, flag) {
        var arr = Object.prototype.toString.call(arr) == '[object Array]' ? arr : [];
        var len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (flag == true && arr[j + 1] < arr[j]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }else if(flag == false && arr[j + 1] > arr[j]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    },

    //正则exec
    regExec: function (str, reg) {
        var str = str,
            reg = reg;
        var result = reg.exec(str);
        return result;
    },

    //拖拽函数
    drag: function (ele) {
        ele.addEventListener('mousedown', function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            document.addEventListener('mousemove', move, false);

            function move(e) {
                ele.style.left = e.pageX - x + 'px';
                ele.style.top = e.pageY - y + 'px';
            }
            this.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', move, false);
            }, false);
        }, false);
    },

    //异步加载
    async: function (url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == 'complete' || script.readyState == 'loaded') {
                    callback();
                } else {
                    script.onload = function() {
                        callback();
                    }
                }
            }
        };
        script.src = url;
        document.head.appendChild(script);
    },

    //类名选择
    byClassName: function () {
        if (document.getElementsByClassName) {
            Element.prototype.getElementsByClassName = document.getElementsByClassName;
            Document.prototype.getElementsByClassName = document.getElementsByClassName;
        } else {
            Element.prototype.getElementsByClassName = Document.prototype.getElementsByClassName = function(_className) {
                var domArray = document.getElementsByTagName('*');
                var len = domArray.length;
                for (var i = 0; i < len; i++) {

                }
            }
        }
    },

    //设计模式
    //单例化方法
    GetSingleton: function (fn) {
        var result;
        return function() {
            if (result != null) {
                return result;
            }
            result = fn.apply(this, arguments);
            return result;
        };
    },
    //验证控件
    Validator: function () {

    }
};
