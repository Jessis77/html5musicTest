var $ = window.Zepto;

function getData(url){
    $.ajax({
        type : "GET",
        url : url,
        success : function(data){
            console.log(data);

        },
        error : function(){
            console.log("error!")
        }
    })
}
getData("../mock/data.json");