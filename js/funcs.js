const numPhotos = 6;
var photoIndex = 1;

var prevImage = null;
var nextImage = null;

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
    photoIndex = parseInt(localStorage.getItem("photoIndex"));
  }

  updatePhoto(false, false);
}

function nextPhoto() {
  photoIndex += 1;
  localStorage.setItem("photoIndex", photoIndex);

  updatePhoto(false, true);
}

function prevPhoto() {
  photoIndex -= 1;
  localStorage.setItem("photoIndex", photoIndex);

  updatePhoto(true, false);
}

function updatePhoto(usePrevImage, useNextImage) {
  if (photoIndex > numPhotos) {
    photoIndex = 1;
  } else if (photoIndex < 1) {
    photoIndex = numPhotos;
  }

  const filename = "img/France2024-" + photoIndex + ".jpg";

  var photo = document.getElementById("photo");
  photo.onload = () => photoLoaded();

  if (usePrevImage && !useNextImage && prevImage) {
    photo.setAttribute("src", prevImage.src);
  } else if (!usePrevImage && useNextImage && nextImage) {
    photo.setAttribute("src", nextImage.src);
  } else {
    photo.setAttribute("src", filename);
  }
}

function photoLoaded() {
  updateCount();
  updateCaption();
  
  prevImage = preload(photoIndex - 1);
  nextImage = preload(photoIndex + 1);
}

function preload(index) {
  if (index > numPhotos) {
    index = 1;
  } else if (index < 1) {
    index = numPhotos;
  }

  img = new Image();
  img.src = "img/France2024-" + index + ".jpg";
  return img;
}

function updateCount() {
  document.getElementById("index").innerText = photoIndex;
}

function updateCaption() {
  var currPhoto = "France2024-" + photoIndex + ".jpg";
  var json = captions[currPhoto];
  if (json) {
    var caption = captions[currPhoto].caption;

    document.getElementById("caption").innerHTML = caption;
  } else {
    document.getElementById("caption").innerHTML = '';
  }
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
