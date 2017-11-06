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
function setcards(){                    //设置卡片。
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
}
function setstarts(n){                 //设置星星
     var start='';     
     for (var i = 0; i < n; i++) {
        start += '<li><i class=\"fa fa-star\"></i></li>\n';
     }
     document.getElementsByClassName("stars")[0].innerHTML = start;
     document.getElementsByClassName("moves")[0].innerHTML = n;
}
function initial(){                 //初始化;
    setcards();
    setstarts(3);
}
window.onload=initial;                
/******************************游戏主要流程***********************************************/
var _testcards=[];                  //用来存放互相匹配的卡片，长度最多为2。

var car_id=[];                      //用来记录卡片的索引值，让卡片在每一次比较中只记录一次。

var match_cards=[];                 //用来存放匹配成功的卡片，长度为16时游戏结束。

var card = document.getElementsByClassName('card');        //获取有图片的li元素节点，返回一个数组对象。		
        
var  handler=function(){
                    var i = this.dataset.id;                        //传入索引值i。
                    car_id.push(i);
                    _testcards.push(card[i]);
                    card[i].className="card show open";
                    if(car_id[0]==car_id[1]){                       //让卡片在每次比较中只能点击一次。
                    car_id.splice(1,1);
                    _testcards.splice(1,1);
                    }
/*当点击两张不同的卡片后，在_testcards数组中将图片比较，相同则改变两张图片的样式，存入match_cards数组，并取消_testcards数组中Li的时件监听，
同时将_testcards数组清零，好做下一次的比较。*/        
                     else{
         	              if(_testcards[0].getElementsByTagName("i")[0].className ==_testcards[1].getElementsByTagName("i")[0].className){
                                    for (var j = 0; j < _testcards.length; j++) {
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
                                    },400);
         	                  }
            /*当匹配成功的的卡片数组长度为16时游戏完成*/
                            if(match_cards.length==16){
                                setTimeout(function(){
                                reset("恭喜你完成游戏！是否重新开始?\n共用步数："+counter+"\n耗时："+second+"秒\n"+"获得:"+ ss+"星");
                                match_cards.length=0;                
                                    },300);
                            }
                            ++counter;
                            document.getElementsByClassName("steps")[0].innerHTML=counter;
                            var ss=changestart();                   //通过点击的步数改变星星，并获取返回的星星数
                        }	          
	               }
 /*给有图片的li元素节点绑定事件监听*/
function bind(length){
            for (var i = 0; i < length; i++) { 
                card[i].dataset['id'] = i;                  //给handler函数传入参数i,既卡片索引。
                card[i].addEventListener('click',handler,false);
            }
 }
 /**********设置游戏过程中星星的变化条件,由时间和步数共同决定*******************/
 function changestart(){
            if((counter<=16)&&(second<=32)){
                    setstarts(3);
                    return 3;
            }          
            if((counter<=16)&&((second>32)&&(second<=50))){
                    setstarts(2);
                    return 2;
            }          
            if(((counter>16)&&(counter<=24))&&(second<=50)){
                    setstarts(2);
                    return 2;
            }           
            if (((counter>24)&&(counter<=32))||(second>50)){
                    setstarts(1);
                    return 1;
            }
            if(counter>32){
                    reset("很遗憾！游戏失败！请在32步内完成！")                 //游戏需要在32步以内完成。
            }  
 }
/***************重新开始***********************/
function reset(mesege){        
            if(confirm(mesege)){
                    counter=0;
                    minute=second=0;
                    initial();
                    document.getElementsByClassName("steps")[0].innerHTML="0";               
                    document.getElementsByClassName('time')[0].innerHTML='00分00秒';      
                    document.getElementById("restart").disabled=true  ;
                    document.getElementById("starting").disabled=false  ;
                    window.clearInterval(int);   
                    for (var i = 0; i < card.length; i++) {
                            card[i].removeEventListener('click',handler,false)
                    }          
            }
}
/***************计时器**********************/
var counter=0;              //记录步数，每翻开两次卡片算一步。
var minute,second;          //时 分 秒    
minute=second=0;            //初始化           
var int;                    //存放计时的时间
function started(){         //开始 
            bind(card.length);
            int=setInterval(timer,1000);  
            document.getElementById("restart").disabled=false  ;
            document.getElementById("starting").disabled=true  ;
}  
function timer(){   //计时 
            second=second+1; 
            if(second>=60){ 
                    second=0;
                    minute=minute+1;       
            }          
            document.getElementsByClassName('time')[0].innerHTML=minute+'分'+second+'秒'; 
            changestart(); //通过时间改变星星
        }    
