/*

function rotatePolaroids() {
    var elements = document.querySelectorAll(".item");
    for (var i = 0; i < elements.length; i++) {
        rotation = getRandomInt(4);

        switch(rotation) {
            case 0:
                elements[i].setAttribute("style", "transform: scale(0.9, 0.9) rotate(5deg); transition: all 0.35s; margin-top: 15px;")
              break;
            case 1:
                elements[i].setAttribute("style", "transform: scale(0.9, 0.9) rotate(-5deg); transition: all 0.35s; margin-top: 15px;")
              break;
            case 2:
                elements[i].setAttribute("style", "transform: scale(0.9, 0.9) rotate(3deg); transition: all 0.35s; margin-top: 15px;")
              break;
            case 3:
                elements[i].setAttribute("style", "transform: scale(0.9, 0.9) rotate(-3deg); transition: all 0.35s; margin-top: 15px;")
              break;
            default:
              // code block
          }
    }

    var polaroidBox = document.querySelector(".polaroid-box");
    polaroidBox.setAttribute("style", "display: unset;");
}

*/

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function fetchPlant() {
  console.log("clicked!")

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  var ID = getRandomInt(3000);
  
  fetch(`https://perenual.com/api/species/details/${ID}?key=sk-XAeC66edde7b941976926`, requestOptions)
    .then(response => response.text()) 
    .then(text => {
      var data = JSON.parse(text); 
      
      var commonName = data.common_name;
      var mediumUrl = data.default_image.medium_url; 
      var description = data.description;
            
      //console.log(commonName);
      //console.log(mediumUrl);
      //console.log(description);

      newPlant(commonName, description, mediumUrl);
    })
    .catch(error => console.log('Error:', error));
}

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const imageElement = document.getElementById("image");

function newPlant(title, description, image_url) {
  console.log(titleElement);
  console.log(descriptionElement);
  console.log(imageElement);

  titleElement.innerHTML = title;
  descriptionElement.innerHTML = description;
  imageElement.src = image_url;
}

registerServiceWorker();

document.getElementById("newPlantButton").addEventListener("click", fetchPlant);

window.addEventListener('load', function () {

  var delayInMilliseconds = 500;
  fetchPlant();

  // short delay waiting for API to respond
  setTimeout(function() {
    this.document.getElementById("content").setAttribute("style", "display: block;")
  }, delayInMilliseconds);
})


// rotatePolaroids();

/*
document.querySelector('#get-access').addEventListener('click', async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: 'environment' }
      }
    });

    const videoTracks = stream.getVideoTracks();
    const track = videoTracks[0];

    const imageCapture = new ImageCapture(track);

    document.querySelector('video').srcObject = stream;
    document.querySelector('#get-access').setAttribute('hidden', true);
//The video stream is stopped by track.stop() after 3 second of playback.
    setTimeout(() => { 
      takePhoto(imageCapture);
      track.stop(); 
    }, 3 * 1000);
} catch (error) {
    alert(`${error.name}`);
    console.error(error);
  }
})

// Get a Blob from the currently selected camera source and
// display this with an img element.
function takePhoto(imageCapture) {
  imageCapture.takePhoto().then(function(blob) {
    console.log("test");
    console.log('Took photo:', blob);

  }).catch(function(error) {
    console.log('takePhoto() error: ', error);
  });
}
*/