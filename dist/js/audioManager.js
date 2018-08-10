(function($,root){
    var $scope = $(document.body);
    function audioManager(){
        this.audio = new Audio();
        this.status = "play";
        this.bindEvent();
    }
    audioManager.prototype = {
        bindEvent: function(){ //监听歌曲是否播放完成
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
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
            this.audio.src = src;
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