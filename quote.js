$(document).ready(function(){
	function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }
	var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  	var length = colors.length;
  	$("button").click(function(){
    	getQuote();
  	});
  	var currentQuote = "", currentAuthor = "";
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
      			currentAuthor = r.author;
      			$("#text").animate({
      				opacity: 0}, 500, function() {
          				$(this).animate({
            				opacity: 1}, 500);
          				$('#quote-text').text(r.quote);
       			});
      			$("#cite").animate({
          			opacity: 0}, 500, function() {
         				$(this).animate({
            				opacity: 1}, 500);
          				$('#quote-cite').html(r.author);
      			});
      			var i = Math.floor(Math.random()*length);
  				color = colors[i];
  				$("html body").animate({backgroundColor: color, color: color}, 1000);
    			$(".button").animate({backgroundColor:color}, 1000);
      			if(inIframe()){
      				$("#twitter").click(function(){
						$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
					});
					$("#tumblr").click(function(){
						$('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
					});
				}
      	    }
      	});

	}	
});