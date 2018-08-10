(function($,root){
    var $scope = $(document.body);
    var $playList = $scope.find(".songlist");
    var $wrapper = $scope.find(".songlist-wrapper");

    function renderList(data){
        var html = "";
        var len = data.length;
        for(var i=0;i<len;i++){
            html +=`<li>${data[i].song}-<span>${data[i].singer}</span></li>`;
        }
        $playList.html(html);
        bindEvent();
    }
    function changeColor(controlManager){
        console.log(controlManager);
        $playList.find(".playing").removeClass("playing");
        $playList.find("li").eq(controlManager.index).addClass("playing");
    }
    function bindEvent(){
        $wrapper.on("click",".list-close",function(){
            $wrapper.removeClass("show");
        })
        $playList.on("click","li",function(){
            var index = $(this).index();
            controlmanager.index = index;
            $scope.trigger("play:onchange",index);
            changeColor(controlmanager);
            setTimeout(function(){
                $wrapper.find(".list-close").trigger("click");
            },400)
        })
    }
    root.list={
        renderList : renderList,
        changeColor : changeColor
    }
})(window.Zepto,window.player || (window.player = {}))
