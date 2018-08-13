(function ($,root){
    var $scope = $(document.body);    
    function getLrc(url){
        console.log(url);
            // //建立一个XMLHttpRequest请求
            // var request = new XMLHttpRequest();
            // //配置, url为歌词地址，比如：'./content/songs/foo.lrc'
            // request.open('GET', url, true);
            // //因为我们需要的歌词是纯文本形式的，所以设置返回类型为文本
            // request.responseType = 'text';
            // //一旦请求成功，但得到了想要的歌词了
            // request.onload = function() {
            //     //这里获得歌词文件
            //     var lyric = request.response;
            // };
            // //向服务器发送请求
            // request.send();
        $.ajax({
            type : "GET",
            url : "html5musicTest"+url,
            dataType: 'text',
            success : function(data){
                console.log(data);
                clipLrc(data);
                addToHTML();
            },
            error : function(){
                console.log("error!"+url)
            }
        })
    }

    function clipLrc(lrc){
        readyLines = [];
        var lines = lrc.split("\n");
        var reg = /\[\d{2}\:\d{2}\.\d{2}\]/g;
        var len = lines.length;
        lines.forEach(function(ele,index){
            if(ele.match(reg)){
                var obj = new Object();
                obj.time = format(ele.match(reg));
                obj.content = ele.replace(reg,"");
                if(obj.content.length == 1){
                    obj.content="<br />"
                    console.log("a");
                }
                readyLines.push(obj);
            }
        })
    }
    function format(time){
        time = JSON.stringify(time);
        var t = time.slice(3,-3).split(":");
        var second = t[0]*60 + Math.floor(t[1]);
        return second;
    }

    function addToHTML(){
        var str = '';
        readyLines.forEach(function(ele,index){
            str += `<div id="No${ele.time}">${ele.content}</div>`
        })
        $scope.find(".lrc-wrapper .moving").html(str);
    }

    root.showLrc = function(url){
        getLrc(url);
    }

})(window.Zepto,window.player || (window.player ={}))
