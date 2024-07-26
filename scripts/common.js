const photoGrid = document.getElementById("photo-grid");
const loader = document.getElementById("loader");
// Flag to see if fist 4 images loaded to be able to remove a loader
let firstImagesLoaded = false;

function addImageProps(numOfImages, folderName) {
  const screenWidth = window.innerWidth;
  let thumbnailPath;
  if (screenWidth >= 1500) {
    thumbnailPath = `./assets/gallery/thumbnails/L/${folderName}`;
  } else if (screenWidth >= 500 && screenWidth < 1500) {
    thumbnailPath = `./assets/gallery/thumbnails/M/${folderName}`;
  } else {
    thumbnailPath = `./assets/gallery/thumbnails/S/${folderName}`;
  }

  for (let i = numOfImages; i >= 1; i -= 1) {
    const img = document.createElement("img");
    img.setAttribute("src", `${thumbnailPath}/${i}.jpg`);
    img.setAttribute("class", "gallery-item");
    img.setAttribute("id", i);
    photoGrid.appendChild(img);
    img.setAttribute(
      "alt",
      `Seattle, Washington product photography item ${i} of ${numOfImages}`
    );
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

export function renderImages(numberOfImages, folderName) {
  // Staring to show loader when rendering images
  addImageProps(numberOfImages, folderName);
  const imgs = getFist4Images();

  const interval = setInterval(() => {
    if (firstImagesLoaded === false) {
      firstImagesLoaded = imgs.every((img) => img.naturalHeight !== 0);
    } else {
      loader.style.display = "none";
      clearInterval(interval);
    }
  }, 500);
}
