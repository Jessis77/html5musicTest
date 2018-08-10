(function($,root){
    function controlManager(len){
        this.index = 0;
        this.length = len;
    }
    controlManager.prototype = {
        prev: function(){
            return this.getIndex(-1);
        },
        next: function(){
            return this.getIndex(1);
        },
        getIndex: function(val){
            var index = this.index;
            var len = this.length;
            var curIndex = (index + val + len)%len;
            this.index = curIndex;
            return this.index;
        }
    }
    root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player = {}))