document.addEventListener('onEnter', function(event) {
    console.log('Custom Enter event triggered!');
    console.log('Event details:', event);


    // Create an iframe element
    const iframe = document.createElement('iframe');
    // Set the source of the iframe to the game link from the event detail
    iframe.src = event.detail.link;
    // Set other attributes of the iframe as needed
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    // Append the iframe to the container element
    const iframeContainer = document.getElementById('iframeContainer');
    iframeContainer.appendChild(iframe);

    // Make the iframe visible
    iframe.style.visibility = "visible";
    showSplashScreen();

    // Remove the splash screen when the iframe is loaded
    iframe.onload = function() {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.parentNode.removeChild(splashScreen);
        }
        document.getElementById('exitButton').style.visibility = "visible";
    };


    // Show the exit button
})

document.addEventListener('onExit', function(event) {
    
    console.log('Custom Exit Event triggered!');
    console.log('Event details:', event);


    // Clear the content of the iframe container
    const iframeContainer = document.getElementById('iframeContainer');
    iframeContainer.innerHTML = '';

    // Hide the exit button
    document.getElementById('exitButton').style.visibility = "hidden";
})



function showSplashScreen() {
    // Create a splash screen element
    let splashScreen = document.getElementById('splashScreen');
    if (!splashScreen) {
        splashScreen = document.createElement('div');
        splashScreen.id = 'splashScreen';
        
        document.body.appendChild(splashScreen);
    }

    let loadingBar = document.getElementById('loader');
    if (!loadingBar) {
        loadingBar = document.createElement('div');
        loadingBar.id = 'loader';
        splashScreen.appendChild(loadingBar);
    }
    
    // Append the splash screen to the body
    // simulateLoading(splashScreen, loadingBar);

     
  }
  function simulateLoading(splashScreen, loadingBar) {
    let width = 0;
    const interval = setInterval(function() {

   

        if (width >= 100 && splashScreen && loadingBar) {
            clearInterval(interval);
            // Optionally, hide the splash screen here
            splashScreen.style.display = 'none';
        } else{
            if(loadingBar)
            {
                width++;
                loadingBar.style.width = width + '%';
            }
        }
    }, 100); // Adjust the speed of loading by changing the interval time
}

function OnAppReady(){
    console.log("### application is loaded")
}