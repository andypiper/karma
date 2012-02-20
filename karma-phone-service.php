<?php

	// make an associative array of directory members we know, indexed by name
	// ultimately this would be a database and not personal information stored in the code!
	$people = array(
		"tim"  => "+44xxxxxxxxxx",
		"dan"  => "+44xxxxxxxxxx",
		"andy" => "+44xxxxxxxxxx",
		"message"  => "voicemail",
		"emergency" => "alert"
	);
	
	// this service should be called from Twilio switchboard with a ?name parameter 
	// pointing to the user desired 
	$directory = $_GET['name'];
	
	// greet the caller
	header("content-type: text/xml");
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
	<Say voice="female" lang="en-gb">Thank you for calling the Karma phone - good Karma is on it's way now!</Say>
	<Play>http://jumpgate.homelinux.net/karma/nicetone.mp3</Play>
	<Say voice="female" lang="en-gb">We are redirecting your call to the service you asked to talk to.</Say>
	<?php 
	// both the voicemail and alert options use a Twimlet which lets the user leave a voicemail
	// the message that is read by the voicemail service can easily be edited
	// ultimately it would be nice to build a "proper" mailbox service using Twilio API, but
	// this was nice and fast for prototyping at #ideomake
	if(($people[$directory]=="voicemail"))
	{	
		echo '<Redirect>';
		echo 'http://twimlets.com/voicemail?Email=someone%40somewhere.valid&amp;Message=';
		echo urlencode("If you'd like to pay it forward, why not help out a neighbour by leaving your own message? Share an insider tip about the local area.");
		echo '&amp;Transcribe=true</Redirect>';
	} 
	elseif(($people[$directory]=="alert"))
	{
		echo '<Redirect>';
		echo 'http://twimlets.com/voicemail?Email=someone%40somewhere.valid&amp;Message=';
		echo urlencode("Report a problem in the local area. Help out your neighbours by leaving a message describing the issue.");
		echo '&amp;Transcribe=true</Redirect>';
	} 
	else
	// if it is not one of the message-leaving services, we forward the call to the
	// member by grabbing the phone number from the directory in the array (DB) at the start
	// afterwards, the flow returns to this service and the final "thank you" message is read out.
	{
		echo "<Dial>" . $people[$directory] . "</Dial>";
	}
	?>
	<Say voice="female" lang="en-gb">The call has ended. Thank you for using Karma Phone. Your Karmic equilibrium is now fully restored and Eee Cee 1 Arr thanks you. Goodbye.</Say>
</Response>
