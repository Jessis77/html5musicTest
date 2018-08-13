(function ($,root){
    var $scope = $(document.body);    
    function getLrc(url){
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
        var url1 = "../.."+url;
        $.ajax({
            type : "GET",
            url : url1,
            dataType: 'text',
            success : function(data){
                clipLrc(data);
                addToHTML();
            },
            error : function(){
                console.log("error!")
            }
        })
    }

    function clipLrc(lrc){
        readyLines = [];
        var notReadyLines = [];
        var lines = lrc.split("\n");
        var reg = /\[\d{2}\:\d{2}\.\d{2,3}\]/g;
        var len = lines.length;
        lines.forEach(function(ele,index){
            if(ele.match(reg)){
                var timeArr = ele.match(reg);
                var content = ele.replace(reg,"");
                timeArr.forEach(function(ele,index){
                    var obj = new Object();
                    obj.time = format(ele.match(reg));
                    obj.content = content;
                    if(obj.content.length == 1 || obj.content.length == 0){
                        obj.content="<br />"
                    }
                    if(index == 0){
                        readyLines.push(obj);
                    }else{
                        notReadyLines.push(obj);
                    }
                });
            }
        })
        if(notReadyLines.length != 0){ //重复的歌词插入数组中，排序
            var len = readyLines.length;
            console.log("only"+notReadyLines);
            notReadyLines.forEach(function(ele,index){
                console.log("1"+ele.content);
                for(var i = 0;i < len;i++){
                    if(readyLines[i].time > ele.time){
                        console.log("2"+ele.conten);
                        readyLines.splice(i,0,ele);
                        len++;
                        break;
                    }
                }
            })
        }
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
            str += `<div class="No${ele.time}">${ele.content}</div>`
        })
        $scope.find(".lrc-wrapper .moving").html(str);
    }

    root.showLrc = function(url){
        getLrc(url);
    }

})(window.Zepto,window.player || (window.player ={}))
