var photoIndex = 1;

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }

    keyPressed(e);
  },
  false
);

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

function startup() {
  if (localStorage.getItem("photoIndex")) {
    photoIndex = parseInt(localStorage.getItem("photoIndex"), 10);
  }

  updatePhoto();
}

function nextPhoto() {
  photoIndex += 1;
  localStorage.setItem("photoIndex", photoIndex);

  updatePhoto();
}

function prevPhoto() {
  photoIndex -= 1;
  localStorage.setItem("photoIndex", photoIndex);

  updatePhoto();
}

function updatePhoto() {
  if (photoIndex > 250) {
    photoIndex = 1;
  } else if (photoIndex < 1) {
    photoIndex = 250;
  }

  const filename = "img/France2024-" + photoIndex + ".jpg";

  var photo = document.getElementById("photo");
  photo.onload = () => photoLoaded();
  photo.setAttribute("src", filename);
}

function photoLoaded() {
  updateCount();
  updateCaption();
}

function updateCount() {
  document.getElementById("index").innerText = photoIndex;
}

function updateCaption() {
  var currPhoto = "France2024-" + photoIndex + ".jpg";
  var caption = captions[currPhoto].caption;

  document.getElementById("caption").innerHTML = caption;
}

function keyPressed(e) {
  if (e.keyCode == "37") {
    prevPhoto();
  } else if (e.keyCode == "39") {
    nextPhoto();
  }
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
