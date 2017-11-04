/*随机生成图片*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        if(randomIndex!=currentIndex-1){
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }       
    }    
    return array;
}
var cards_style = ['fa-diamond','fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'];
var str = '';
shuffle(cards_style);
for (var i = 0; i<cards_style.length;i++){
    str += '<li class = \"card\"><i class=\"fa '+cards_style[i]+'\"></i></li>\n';
}
document.getElementsByClassName("deck")[0].innerHTML = str;
/******************************游戏主要流程***********************************************/
 //window.onload=function(){
	var _testcards=[];     //用来存放互相匹配的卡片，长度最多为2。

    var car_id=[];      //用来记录卡片的索引值，让卡片在每一次比较中只记录一次。

    var match_cards=[];     //用来存放匹配成功的卡片，长度为16时游戏结束。

	var card = document.getElementsByClassName('card');        //获取有图片的li元素节点，返回一个数组对象。

    var counter=0;      //记录步数，每翻开两次卡片算一步。

	 /*for (var i = 0; i < card.length; i++) {        /*要想成功取消事件监听，handler函数必须前后一致，所以取消这种绑定方法。
     
		(function(i){*/	
		
         /*让卡片在每一次比较中只记录一次*/
         var  handler=function(){
            var i = this.dataset.id;
            car_id.push(i);
            _testcards.push(card[i]);
            card[i].className="card show open";
            if(car_id[0]==car_id[1]){
                car_id.splice(1,1);
                 _testcards.splice(1,1);
            }
         /*当点击两张不同的卡片后，在_testcards数组中将图片比较，相同则改变两张图片的样式，存入match_cards数组，并取消_testcards数组中Li的时件监听，
         同时将_testcards数组清零，好做下一次的比较。*/
         else
         {
         	if(_testcards[0].getElementsByTagName("i")[0].className ==_testcards[1].getElementsByTagName("i")[0].className)
                { 

                    for (var j = 0; j < _testcards.length; j++) 
                        {
                            (function(j){
                                 _testcards[j].className="card match";
                            match_cards.push(_testcards[j]);
                            _testcards[j].removeEventListener('click',handler,false);
                            })(j)
                          
                        } 
                            _testcards.length=0;
                            car_id.length=0;
         	    }
                /*当两张卡片不同，就将卡片恢复原样，由于视觉效果使用setTimeout来改变图片的样式*/
         	else{ 
                    _testcards[0].className="card show error";
                    _testcards[1].className="card show error";                  
                    setTimeout(function(){
                        _testcards[0].className="card ";
                        _testcards[1].className="card ";
                        _testcards.length=0;
                        car_id.length=0;
                        },300);
         	    }
            /*当匹配成功的的卡片数组长度为16时游戏完成*/
            if(match_cards.length==16)
            {
                setTimeout(function(){
                   if(confirm("恭喜你完成游戏！是否重新开始?")){
                   window.location.href="index.html";}            
                    },100);
            }
         }	

	    }
         /*给有图片的li元素节点绑定事件监听*/
        for (var i = 0; i < card.length; i++) { 
            card[i].dataset['id'] = i;       //给handler函数传入参数i,既卡片索引。
            card[i].addEventListener('click',handler,false);
	 /* })(i)*/
	   }
	//}
	
/***************重新开始***********************************/
function reset(){    
    if(confirm("是否重新开始?")){
      window.location.href="index.html";            
    }
}