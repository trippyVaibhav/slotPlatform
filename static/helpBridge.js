document.addEventListener('onEnter', function(event) {
    console.log('Custom Enter event triggered!');
    console.log('Event details:', event);

        document.getElementById('externalContent').src = event.detail.gameLinks;
		const frame = document.getElementById('externalContent');
  
   
        frame.style.visibility = "visible";
        document.getElementById('exitButton').style.visibility = "visible";
})

document.addEventListener('onExit', function(event) {
    
    console.log('Custom Exit Event triggered!');
    console.log('Event details:', event);

        document.getElementById('externalContent').src = "";
		const frame = document.getElementById('externalContent');
		frame.style.visibility = "hidden";

        document.getElementById('exitButton').style.visibility = "hidden";
        

})

