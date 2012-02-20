window.utils = function () {

var scriptname = "ajshakjh",
getLoader =  function () {
	var object = null;
	// branch for native XMLHttpRequest object
	if(window.XMLHttpRequest && !(window.ActiveXObject)) 
		{
		try 
			{
			object = new XMLHttpRequest();
			} 
		catch(e) 
			{
			object = false;
			}
	// branch for IE/Windows ActiveX version
		} 
	else
		{
		 if(window.ActiveXObject)  
			{
			try 
				{
				object = new ActiveXObject("Msxml2.XMLHTTP");
				} 
			catch(e) 
				{	
				try 
					{
					object = new ActiveXObject("Microsoft.XMLHTTP");
					} 
				catch(e) 
					{
					object = false;
					}
				}
			}	
		}
	return object;
	},
setHttpStatus = function(node,type) {
switch(type)
	{
	case 0:node.innerHTML="";break;
	case 1:node.innerHTML="Opened...";break;
	case 2:node.innerHTML="Headers received...";break;
	case 3:node.innerHTML="Loading...";break;
 	case 4:node.innerHTML="";break;
	}
};


return {
		sendMessage : function (message,callback) {
		var xmlhttp=getLoader();
		if(xmlhttp === null)
				{
				alert("the loader was null");
				return;
				}
		xmlhttp.onreadystatechange = function() {
		  	setHttpStatus(document.getElementById("status"),xmlhttp.readyState);
		  	if (xmlhttp.readyState==4) {	
		    		if (xmlhttp.status==200) {
						alert(xmlhttp.responseText.substr(0,500));
						if(callback!==undefined) {
							callback(xmlhttp.responseText);
						} else {
						}
					} else {
					alert(xmlhttp.status + " " + xmlhttp.responseText);
					}
				}
			}
		xmlhttp.open("POST", scriptname);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(message);
		}
	};
}();


