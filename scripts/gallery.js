const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
// Full image inside lightbox
const lightBoxImg = document.createElement("img");
// Left/Right arrows
const lightBoxPrev = document.getElementById("previous");
const lightBoxNext = document.getElementById("next");
const nextArrow = document.getElementById("next-arrow");
const prevArrow = document.getElementById("previous-arrow");
const closeBnt = document.getElementById("closeImgView");

lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("lightbox-prev");
lightBoxNext.classList.add("lightbox-next");
prevArrow.addEventListener("click", prevImage);
nextArrow.addEventListener("click", nextImage);

lightBoxContainer.appendChild(lightBoxContent);
closeBnt.addEventListener("click", closeLightBox);

lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
const scrollablePagePart = document.getElementById("scrollable-page-content");

document.body.appendChild(lightBoxContainer);

let index = 1;

// Adding event to detect current image and render lightbox when user clicks on an image cover
for (let i = 0; i < galleryItem.length; i++) {
  galleryItem[i].addEventListener("click", () => currentImage(i + 1)); // + 1 because HTML IDs start with 1
}

function currentImage(imageIndex) {
  lightBoxContainer.style.display = "flex";
  showLightBox((index = imageIndex));
}

// Triggering image display
function showLightBox(n) {
  // Adding an ability to change images with key left/right
  document.addEventListener("keydown", changeImgOnKeyPress);
  scrollablePagePart.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // If we looked through all clicking right images - start from the first one again (1,2,3,1,2,3...1,2,3)
  if (n > galleryItem.length) {
    index = 1;
  }

  // If we looked through all clicking left images - start from the last one again (3,2,1,3,2,1...3,2,1)
  if (n === 0) {
    index = galleryItem.length;
  }

  // Copying src of an image cover and adding it to an image inside lightbox
  const thumbnailPath = galleryItem[index - 1].getAttribute("src");
  // ./assets/gallery/thumbnails/L/product/24.jpg
  const pathArray = thumbnailPath.split("/");
  const categoryAndImage = pathArray.slice(pathArray.length - 2).join("/");

  const imageLocation = `./assets/gallery/${categoryAndImage}`;

  lightBoxImg.setAttribute("src", imageLocation);
  lightBoxImg.setAttribute("alt", "Enlarged portfolio photo");
}

// Changing next/prev images on arrow press or D/A keys for WASD users
function changeImgOnKeyPress(evt) {
  if (evt.code === "ArrowRight" || evt.code === "KeyD") {
    nextImage();
  } else if (evt.code === "ArrowLeft" || evt.code === "KeyA") {
    prevImage();
  }
}

function slideImage(n) {
  showLightBox((index += n));
}

function prevImage() {
  slideImage(-1);
}

function nextImage() {
  slideImage(1);
}

// Close if user clicked on lightbox outside all elements
function closeLightBox(event) {
  scrollablePagePart.removeAttribute("style");
  document.body.removeAttribute("style");
  lightBoxContainer.style.display = "none";
}

// Creating a class to handle swipe left/right
class SwipeEventDispatcher {
  constructor(element, options = {}) {
    this.evtMap = {
      SWIPE_LEFT: [],
      SWIPE_RIGHT: [],
    };

    this.xDown = null;
    this.yDown = null;
    this.element = element;
    this.isMouseDown = false;
    this.listenForMouseEvents = true;
    this.options = Object.assign({ triggerPercent: 0.3 }, options);

    element.addEventListener(
      "touchstart",
      (evt) => this.handleTouchStart(evt),
      false
    );
    element.addEventListener(
      "touchend",
      (evt) => this.handleTouchEnd(evt),
      false
    );
  }

  on(evt, onSwipeFn) {
    this.evtMap[evt].push(onSwipeFn);
  }

  trigger(evt, data) {
    this.evtMap[evt] && this.evtMap[evt].map((handler) => handler(data));
  }

  handleTouchStart(evt) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  }

  handleTouchEnd(evt) {
    const deltaX = evt.changedTouches[0].clientX - this.xDown;
    const deltaY = evt.changedTouches[0].clientY - this.yDown;
    const distMoved = Math.abs(
      Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY
    );

    if (distMoved > this.options.triggerPercent) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaX < 0 ? this.trigger("SWIPE_LEFT") : this.trigger("SWIPE_RIGHT");
      } else {
        deltaY > 0 ? this.trigger("SWIPE_UP") : this.trigger("SWIPE_DOWN");
      }
    }
  }
}

window.addEventListener("load", function (event) {
  const dispatcher = new SwipeEventDispatcher(document.body);
  dispatcher.on("SWIPE_RIGHT", () => {
    prevImage();
  });
  dispatcher.on("SWIPE_LEFT", () => {
    nextImage();
  });
});
