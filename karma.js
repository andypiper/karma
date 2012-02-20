var endings = ["1389", "1327", "1453", "1453", "1327", "1706", "1894"]; 
var module = function() {
	
return {
	button: function (index) {
	var node = document.getElementById(""+index),
	ending = "skype:+44203322" + endings[index - 1] + "?call";
	node.onclick = function() {
	alert(ending);
	window.location = ending;
		}
//	node.onmouseover = function() {
//		this.style.background="#eee";
//	}
//	node.onmouseout = function() {
//		this.style.background="#ccc";
//	}

	}

};
	
}();

jQuery(document).ready(function () {

var header = document.getElementById("header");

for( var i=1 ; i <= 7; i++) {	
	module.button(i);
	}
	
window.onscroll = function() {

//alert (document.body.scrollTop);
header.style.top = document.body.scrollTop +"px";
	
}

});


