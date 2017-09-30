var questions = 
[
	{
		ques:'What kind of animal did Bill Clinton have in office?',
		ans:['dog','Cat','mouse','bird'],
		corr:1,
		image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXO_S4wlp8WS7EzrgWmcpQ-QwSiR2FIl8-DyB2x6HjpaNrcwGbyw'
	},{
		ques:'What is the most spoken language in the world?',
		ans:['Chinese','japanese','spanish','english'],
		corr:0,
		image:'http://www.englishfirst.com/ESL-Jobs/wp-content/uploads/2016/06/Tips.jpg'
	},{
		ques:'What city is the capital of China?',
		ans:['shanghai','tokyo','Beijing','shenzhen'],
		corr:2,
		image:'https://upload.wikimedia.org/wikipedia/en/c/c6/Modern_Beijing_Traffic.jpg'
	},{
		ques:'How fast can a honey bee fly?',
		ans:['10MPH','15MPH','20MPH','17MPH'],
		corr:1,
		image:'http://images.roadtrafficsigns.com/img/lg/K/aluminum-speed-limit-sign-k-2083.png'
	},{
		ques:"Are more baby's born at night or during the day?",
		ans:['Night','noon','morning','no matter'],
		corr:0,
		image:'https://media.giphy.com/media/3ohze0k1Z43jsEJMCQ/source.gif'
	},{
		ques:'What is the longest river in the world?',
		ans:['ebay','missipi','happy','Amazon'],
		corr:3,
		image:'https://cdn.inquisitr.com/wp-content/uploads/2016/04/AP_625500304413.jpg'
	},{
		ques:'Which planet has the most moons?',
		ans:['mars','earth','Jupiter','saturn'],
		corr:2,
		image:'http://solarsystem.nasa.gov/images/slideshow/JupiterEarthCompareWidth_835.jpg'
	},{
		ques:'What does NASA stand for?',
		ans:['National Aeronautics and Space Administration','now acident stand act','next aeronauticse super ample','national ace sweet apple'],
		corr:0,
		image:'https://pbs.twimg.com/profile_images/825433399925956608/f30XQBEP.jpg'
	},{
		ques:'What kind of tree do acorns grow on?',
		ans:['berry','maple','Oak','green'],
		corr:2,
		image:'http://carlblackburn.com/wp-content/uploads/2016/01/Mythology.jpg'
	},{
		ques:'In what year did Fidel Castro die?',
		ans:['2o16','1992','1999','2010'],
		corr:0,
		image:'https://thumbs.dreamstime.com/z/2016-golden-card-37205921.jpg'
	}
];
var correct = 0;
var wrong = 0;
var skip = 0;
// var timeLeft = 11;
var timeLeft = 10;
var intervalId;
var quesNum = 0;
var done = 2;
var clicked = '';

$(document).ready(function(){
	$('#reset').hide()
	$('#start_btn').on('click',function(){
		
		$('#start_group').hide()
		giveQues();
	})
});
$('#reset').on('click',function(){
	$('#start_group').show();
	$('#reset').hide();
	correct = 0;
	wrong= 0;
	skip = 0;
	quesNum = 0;
	$('#correct').text(correct);
	$('#wrong').text(wrong);
	$('#skip').text(skip);
})
$(document).on('click','.letter',function(){
	clicked = $(this).attr('data-ans');
	var choice = questions[quesNum];
	// console.log(clicked);
	// console.log(choice.ans[choice.corr])

	if(clicked == choice.ans[choice.corr]){
		correct++;
		$('#correct').text(correct);
		resets();
	}else{
		// console.log(wrong);
		wrong++;
		$('#wrong').text(wrong);
		resets();
	}

})
function resets(){
	if (quesNum == 9){
		clearInterval(intervalId);
	}
	if (quesNum == 10){
		$('#question').empty();
		$('#answer').empty();
		$('#image').empty();
		timeLeft = 10;
		$('#question').text('Game End Press Reset to Play Again');
		clearInterval(intervalId);
		$('#reset').show();
	}else{
		stop();
	}
}
function giveQues(){
	$('#question').empty();
	$('#answer').empty();
	$('#image').empty();
	intervalId = setInterval(decrement, 1000);
	$('#question').html('<h3>'+questions[quesNum].ques+'</h3>')
	var right = questions[quesNum].ans;
	for(var i = 0;i<right.length;i++){
		var answer = $('<button>');
		answer.addClass("letter-button letter letter-button-color");
		answer.attr('data-ans',right[i])
		answer.text(right[i]);
		$('#answer').append(answer);
	}
	
}

function decrement() {
      //  Decrease number by one.
      timeLeft--;
      //  Show the number in the #show-number tag.
      $("#timer").html("<h2>" + timeLeft + "</h2>")
      //  Once number hits zero...
      if (timeLeft === 0) {
      	if(quesNum<10){
	        skip++;
	        $('#skip').text(skip);
        	resets();
        }else{
        	resets();
        }
        
      }
}
function stop(){
	clearInterval(intervalId);
	$('#question').empty();
	$('#answer').empty();
	$('#image').empty();
	var choice = questions[quesNum];
	if(clicked == choice.ans[choice.corr]){
		$('#answer').text('Correct');
		var img = $('<img>');
		img.attr('src',choice.image);
		$('#image').append(img);
		quesNum++;
	}else{
		$('#answer').text('Wrong! The answer is '+ choice.ans[choice.corr]);
		var img = $('<img>');
		img.attr('src',choice.image);
		$('#image').append(img);
		quesNum++;
	}
	setTimeout(passing,1000)
}
function passing(){
	timeLeft = 10;
	giveQues()
}
