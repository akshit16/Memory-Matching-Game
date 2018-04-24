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
$("#win").hide();
$("#message").hide();

//list of cards
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let list = shuffle(cards);
var score =100;
var length = list.length;
var stars='';
var open =[];
var m;
var sc='';
m=0;
var inputs='';
for(var i=0;i<length;i++)
{
	inputs+="<div class='front'><li class='card' ><i class= 'fa "+list[i]+"' ></i></li></div>";
}
document.getElementById("deck").innerHTML=inputs;
stars+="<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
document.getElementById('stars').innerHTML=stars;	
var op =[];
var j=0;
let l=0;

//function is invoked when any card is clicked
function clickCard(){

//one move comprises of 2 card flips
  l++;
  $('span').html("Moves: "+ Math.floor(l/2));
  if(op.length==0||op.length==1)
  {
     $(this).addClass('open show')
    op.push($(this));
    $(this).off("click");
  }

   if(op.length===2)
  {
    
    if(op[0].find('i').attr('class')==op[1].find('i').attr('class'))
    {
    
      op[0].addClass('match');
      op[1].addClass('match');
      op[0].off('click');
      op[1].off('click');
      op.length=0;
      op=[];
      }
    else  setTimeout(function() {
        
        op[0].removeClass('open show match');
        op[1].removeClass('open show match');
        op[0].on('click',clickCard);
        op[1].on('click',clickCard);
       
                
       
       op.length=0;
       op=[];
      
    },500);
  message();
  }
}
$('.card').click(clickCard);
$('.card').click(star);  


//function for changing star ratings based on number of moves
function star(){ 
	sc='';
    stars='';
    if(l<=15)
    {
        for(var o=0;o<3;o++)
        {
            stars+="<li><i class='fa fa-star'></i></li>";
        }
        document.getElementById('stars').innerHTML=stars;
        sc=stars;

        stars='';
    }
    else if(l<=25&&l>15)
    {
        for(var o=0;o<2;o++)
        {
            stars+="<li><i class='fa fa-star'></i></li>";
        }
        document.getElementById('stars').innerHTML=stars;
        sc=stars;
        stars='';
        }
    else
    {
        stars+="<li><i class='fa fa-star'></i></li>";
        document.getElementById('stars').innerHTML=stars;
        sc=stars;
        stars='';
    }
}
   

 //timer reference from stackoverflow
 var p = document.getElementsByTagName('p')[0];
 var z;
 var  seconds = 0, minutes = 0, hours = 0;
 	
function time()
  {
    seconds++;
    if (seconds >= 60) 
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60) 
        {
            minutes = 0;
            hours++;
        }
    }
    p.textContent = "Timer: "+(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
  }

function timer()
 {
    z = setTimeout(time, 1000);
 }

//start timer when card is clicked
$('.card').one("click",function()
{
    if(m==0)
	 { 
	    timer();
     }
    m=1;
});

 //function invoked upon winning the game
 //display winning message and stop timer
 //displaying player's score instead of rating
 function message()
 {
 	var t = $('.match').length;
 	if(t==16)
 	{
 		clearTimeout(z);
 		if(score>0)
 		{
 		    score = 100-Math.floor(l/2);
 	    }
 	    else
 	    {
 	    	score=5;
 	    }
 		$(".container").hide(1000);
 		$("#win").show(1500);
        $("#message").show(1500);
 		$('p').html("You have won the game.<br>Moves: "+ Math.floor(l/2)+"<br>Time: "+(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" 
 			+ (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) +"<br> Score: "+score+"<br><br><button onclick='reset()'>Play Again</button>");
        document.getElementById('star').innerHTML="Ratings: "+sc;
 	}
 } 
 $('.restart').click(function() {
 	location.reload();
 });

//restart the game
function reset()
{
	location.reload();
}








