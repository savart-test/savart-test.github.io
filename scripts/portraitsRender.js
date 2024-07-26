const numberOfPortraits = 90;

const photoGrid = document.getElementById("photo-grid");
const loader = document.getElementById("loader");
// Flag to see if fist 4 images loaded to be able to remove a loader
let firstImagesLoaded = false;

function renderImages() {
  // Staring to show loader when rendering images
  addImageProps(numberOfPortraits);
  const imgs = getFist4Images();

  const interval = setInterval(() => {
    if (firstImagesLoaded === false) {
      firstImagesLoaded = imgs.every((img) => img.naturalHeight !== 0);
    } else {
      loader.style.display = "none";
      clearInterval(interval);
    }
  }, 100);
}

function addImageProps(numOfImages) {
  for (let i = 1; i <= numOfImages; i += 1) {
    const img = document.createElement("img");
    img.setAttribute("src", `./assets/gallery/portraits/${i}.jpg`);
    img.setAttribute("class", "gallery-item");
    img.setAttribute("id", i);
    img.setAttribute(
      "alt",
      `Seattle, Washington portrait photography item ${i} of ${numOfImages}`
    );
    photoGrid.appendChild(img);
  }
}

function getFist4Images() {
  const imgs = [];
  for (let i = 1; i < 4; i += 1) {
    const imgElement = document.getElementById(i);
    imgs.push(imgElement);
  }

  return imgs;
}

renderImages();
