//页面加载完成后调用getQuote函数。
$(document).ready(function(){
	getQuote();
	$("#new-quote").click(function(){//为“new-quote”按钮绑定事件，点击时更换新quote。
    	getQuote();
  	});
  	$('#twitter').on('click', function() {//为“twitter”按钮绑定事件，点击时网页内跳转。
    	if(!inIframe()) {
      		openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    	}
  	});
  	$('#tumblr').on('click', function() {//为“tumblr”按钮绑定事件，点击时网页内跳转。
    	if(!inIframe()) {
      		openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
   		}
  	});
});
	var currentQuote = "", currentAuthor = "";

	function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }  

	function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
} 

  	function getQuote() {
 		 $.ajax({
    		headers: {
     			"X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",   
     			Accept: "application/json",
      			"Content-Type": "application/x-www-form-urlencoded"
   			},
    		url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    		success: function(response) {
     			var r = JSON.parse(response);
     			
      			currentQuote = r.quote;
      			currentAuthor = r.author;//这两行解析出此时的quote和author。
      			$("#text").animate({//quote先渐隐再渐显，并更新内容。
      				opacity: 0}, 500, function() {
          				$(this).animate({
            				opacity: 1}, 500);
          				$('#quote-text').text(r.quote);
       			});
      			$("#cite").animate({//author先渐隐再渐显，并更新内容。
          			opacity: 0}, 500, function() {
         				$(this).animate({
            				opacity: 1}, 500);
          				$('#quote-cite').html(r.author);
      			});
      			//设置轮换背景色数组，并随机轮换颜色。
      			var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  				var length = colors.length;
      			var i = Math.floor(Math.random()*length);
  				color = colors[i];
  				$("html body").animate({backgroundColor: color, color: color}, 1000);
    			$(".button").animate({backgroundColor:color}, 1000);
    			//为tweet和tumblr按钮添加href属性。页面加载完成getQuote自动执行后即完成初次设置，后每次点击new-quote刷新设置。
    			if(inIframe()){
					$('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
					$('#tumblr').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
				} 	
      		}
      	});

	}	
