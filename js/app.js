/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
window.onload=function(){
	var _testcards=[];//用来存放互相匹配的卡片，长度最多为2。
    var id=[];//用来记录卡片的索引值，同时在图片不匹配时能使用
    var match_cards=[];//用来存放匹配成功的卡片，长度为16时游戏结束。
	var card = document.getElementsByClassName('card');//获取有图片的li元素节点，返回一个数组对象
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



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
