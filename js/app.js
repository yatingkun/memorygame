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
 window.onload=function(){
	var _testcards=[];//用来存放互相匹配的卡片，长度最多为2。

    var id=[];//用来记录卡片的索引值，同时在图片不匹配时能使用。

    var match_cards=[];//用来存放匹配成功的卡片，长度为16时游戏结束。

	var card = document.getElementsByClassName('card');//获取有图片的li元素节点，返回一个数组对象。
    
    /*给有图片的li元素节点绑定事件监听*/
	for (var i = 0; i < card.length; i++) {  
		(function(i){	
		//card[i].addEventListener('click',handler,false);
         /*让卡片在每一次比较中只能点击一次*/
         var  handler=function(){
         id.push(i);
         if(id[0]!=id[1]){
            _testcards.push(card[i]);
            card[i].className="card show open";
         }
         else{
            id.pop();
         }
         /*当点击两张不同的卡片后，在_testcards数组中将图片比较，相同则改变两张图片的样式，存入match_cards数组，并取消_testcards数组中Li的时件监听，
         同时将_testcards数组清零，好做下一次的比较。*/
         while(_testcards.length==2)
         {
         	if(_testcards[0].getElementsByTagName("i")[0].className ==_testcards[1].getElementsByTagName("i")[0].className)
                { 
                    for (var j = 0; j < _testcards.length; j++) 
                        {
                            _testcards[j].className="card match";
                            match_cards.push(_testcards[j]);
                            _testcards[j].removeEventListener('click',handler,false);//取消监听绑定
                        } 

                            id.length=0;
         	    }
                /*当两张卡片不同，就将卡片恢复原样，由于视觉效果，必须使用setTimeout来改变图片的样式，因为我设置有 _testcards的清零，
                所有无法再使用_testcards数组中索引来改变图片，却刚好能将id数组中的索引用过来。比较后id数组清零。*/
         	else{
                    card[id[0]].className="card show error";
                    card[id[1]].className="card show error";                  
                    setTimeout(function(){
                        card[id[0]].className="card ";
                        card[id[1]].className="card ";
                        id.length=0;
                        },1000);
         	    }
         	_testcards.length=0;
            /*当匹配成功的的卡片数组长度为16时游戏完成*/
            if(match_cards.length==16)
            {
                setTimeout(function(){
                   alert("恭喜你完成游戏！");
                   for (var i = 0; i < card.length; i++) {
                       card[i].className="card";
                   }
                   match_cards.length=0;
                    },500);
            }
         }	

	    }
          card[i].addEventListener('click',handler,false);
	  })(i)
	   
	}
	
}
/***************重新开始***********************************/
function reset(){    
    if(confirm("是否重新开始?")){
      window.location.href="index.html";            
    }
}