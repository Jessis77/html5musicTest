
(function($,root){
    var $scope = $(document.body);
    var curDuration; 
    var frameId;
    var lastPercent = 0;
    var startTime;
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration/60);
        var second = duration - 60 * minute;
        if(minute<10){
            minute = "0" + minute;
        }
        if(second<10){
            second = "0" + second;
        }
        return minute+":"+second;
    }
    function reset(){
        lastPercent = 0;//换源清空上次记录
        update(0);//滚动条
        if(frameId){
            cancelAnimationFrame(frameId);
        }
    }
    function renderAllTime(duration){ //总时间
        reset();
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find(".all-time").html(allTime);
    }
    function update(percent){ //更新进度条
        var curTime = percent *curDuration;
        curTime =  formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var percentage = (percent - 1) *100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX("+ percentage +")"
        });
    }
    function start(percentage){     //计算百分比
        lastPercent = percentage === undefined ? lastPercent:percentage;
        startTime = new Date().getTime();
        function frame(){  //这里用requestAnimationFrame动画16ms自动刷新一次
            var curTime = new Date().getTime();
            var percent = (curTime - startTime)/(curDuration*1000) + lastPercent;
            update(percent);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId);
    }

    root.processor={
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        update : update
    }
})(window.Zepto,window.player || (window.player ={}));