// define page elements
var username = document.getElementById('username');
var message = document.getElementById('message');
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var login = document.getElementById('login');

var messagesRef = firebase.database().ref('messages');

// Retrieve new posts as they are added to Firebase
messagesRef.limitToLast(20).on("child_added", function(data) {
	var newPost = data.val();

	var msg = document.createElement("div");
	msg.innerText = newPost.username + ": " + newPost.message;

	messages.appendChild(msg);
	console.log(newPost);

	//scroll to the end
	messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', function(event){
	event.preventDefault(); //prevent form from doing page reload
	console.log("form submitterd");

	//append the posted data to the fire database
	messagesRef.push({'username':username.value,'message':message.value});
	message.value = ""; //clear the page message
	message.focus(); //put the cursor in the box for the next message
});