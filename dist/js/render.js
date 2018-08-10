(function($,root){
    var $scope = $(document.body);

    // 渲染歌曲信息
    function renderInfo(info){
        var html = '<div class="song-name">' + info.song + '</div>\
        <div class="singer-name">' + info.singer + '</div>\
        <div class="album-name">' + info.album+ '</div>';
        $scope.find(".song-info").html(html);
    }

    // 渲染图片
    function renderImage(src){
        $scope.find(".song-img img").attr("src","/html5musicTest"+src)
    }
    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImage(data.image);
        renderIsLike(data.isLike);
    }
})(window.Zepto,window.player || (window.player = {})) //如果没有player，定义一个对象
