function rotatePolaroids() {
    var elements = document.querySelectorAll(".item");
    for (var i = 0; i < elements.length; i++) {
        rotation = getRandomInt(4);

        console.log(rotation);
        console.log(elements[i])

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

rotatePolaroids();

document.querySelector('#get-access').addEventListener('click', async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: 'environment' }
      }
    });

    const videoTracks = stream.getVideoTracks()
    const track = videoTracks[0]
    document.querySelector('video').srcObject = stream
    document.querySelector('#get-access').setAttribute('hidden', true)
//The video stream is stopped by track.stop() after 3 second of playback.
    setTimeout(() => { track.stop() }, 3 * 1000)
    videoElement.style.display = 'none';
  } catch (error) {
    alert(`${error.name}`)
    console.error(error)
  }
})