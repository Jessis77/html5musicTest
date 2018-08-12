(function($,root){
    var $scope = $(document.body);
    function audioManager(){
        this.audio = new Audio();
        this.status = "play";
        this.bindEvent();
        $scope.append(this.audio);
    }
    audioManager.prototype = {
        bindEvent: function(){ //监听歌曲是否播放完成
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            });
            $(this.audio).on("timeupdate",function(){
                for (var i = 0, l = readyLines.length; i < l; i++) {
                    if (this.currentTime > readyLines[i].time) {
                        var str = ".moving #No"+readyLines[i].time;
                        var top = -i*24 +52;
                        $scope.find(".moving").css("top",top+"px");
                        $scope.find(".moving .singing").removeClass("singing");
                        $scope.find(str).addClass("singing");
                    };
                };
            })
        },
        play: function(){
            this.audio.play();
            this.status = "play";
        },
        pause: function(){
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSourse: function(src){
            this.audio.src = "/html5musicTest"+src;
            this.audio.autoplay = true;
            this.audio.load();
            this.status = "play";
            if($(".play-btn").hasClass("pause")){
                $(".play-btn").removeClass("pause");
            }    
        },
        jumpToplay: function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioManager = audioManager;
})(window.Zepto,window.player || (window.player ={}))
