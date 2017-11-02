function reset(){
    
    if(confirm("是否重新开始?")){
       var li= document.getElementsByClassName("card");
       for (var k = 0; k < li.length; k++) {
           li[k].className="card";
       }      
    }
}
