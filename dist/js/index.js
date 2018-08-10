var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var index = 0;
var songList;
var controlmanager;
var audio = new root.audioManager();

function bindClick(){
    $scope.on("play:onchange",function(event,index){
        audio.setAudioSourse(songList[index].audio); //换源
        root.processor.renderAllTime(songList[index].duration); //时间长度
        root.render(songList[index]); //换歌曲信息
        root.processor.start();
        root.list.changeColor(controlmanager);
    })
    $scope.on("click",".prev-btn",function(){
        index = controlmanager.prev();
        $scope.trigger("play:onchange",index);
    })
    $scope.on("click",".next-btn",function(){
        index = controlmanager.next();
        $scope.trigger("play:onchange",index);
    })
    $scope.on("click",".play-btn",function(){
        if(audio.status == "play"){
            root.processor.stop();
            audio.pause();
            $(this).addClass("pause");
        }else{
            root.processor.start();
            audio.play();
            $(this).removeClass("pause");
        }
    })
    $scope.on("click",".list-btn",function(){
        $scope.find(".songlist-wrapper").addClass("show");
    })
}

function bindTouch(){
    var $slidePoint = $scope.find(".slide-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;

    $slidePoint.on("touchstart",function(){
        root.processor.stop();
    }).on("touchmove",function(e){
        var curOffset = e.changedTouches[0].clientX;
        var percent = (curOffset - left)/width;
        if(percent<0 || percent>1){
            percent = 0;
        }
        root.processor.update(percent);
    }).on("touchend",function(e){
        var endOffset = e.changedTouches[0].clientX;
        var percent = (endOffset - left)/width;
        if(percent<0 || percent>1){
            percent = 0;
        }
        root.processor.update(percent);
        var curDuration = songList[index].duration;
        time = curDuration * percent;
        audio.jumpToplay(time);
        root.processor.start(percent);
        $(".play-btn").removeClass("pause");
    })

}

function getData(url){
    $.ajax({
        type : "GET",
        url : url,
        success : function(data){
            bindClick();
            bindTouch();
            controlmanager = new root.controlManager(data.length);
            songList = data;
            $scope.trigger("play:onchange",0);
            root.list.renderList(data);
            root.list.changeColor(controlmanager);
        },
        error : function(){
            console.log("error!")
        }
    })
}
getData("../mock/data.json");
