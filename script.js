const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const noImages = document.getElementById('noImages');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.querySelector('.close-btn');


const galleryData = [];
const totalImages = 50; 

for (let i = 1; i <= totalImages; i++) {
  galleryData.push({
    name: 'Image ' + i,
    src: 'images/image' + i + '.jpeg', 
  });
}

let currentIndex = 0;

function loadImages(start = 0, end = 12, imagesToLoad = galleryData) {
  const imagesToShow = imagesToLoad.slice(start, end);
  imagesToShow.forEach(function(image, index) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.innerHTML = `
      <img src="${image.src}" alt="${image.name}">
      <div class="image-info">
        <span>${image.name}</span>
        <button >Download</button>
      </div>
    `;
    item.onclick = function() { openModal(index + start); };
    galleryGrid.appendChild(item); 
  });


  if (imagesToShow.length === 0) {
    noImages.style.display = 'block';
  } else {
    noImages.style.display = 'none';
  }
}

function searchImages() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredImages = galleryData.filter(function(image) {
    return image.name.toLowerCase().includes(query); 
  });

  galleryGrid.innerHTML = ''; 
  loadImages(0, 12, filteredImages); 
}

function openModal(index) {
  currentIndex = index;
  modalImage.src = galleryData[index].src;
  imageModal.style.display = 'block';
}

function closeModal() {
  imageModal.style.display = 'none';
}

function navigateModal(direction) {
  currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
  modalImage.src = galleryData[currentIndex].src;
}

// function downloadImage(src) {
//   const link = document.createElement('a');
//   link.href = src;
//   link.download = src.split('/').pop();
//   link.click();
// }

closeBtn.onclick = closeModal;
prevBtn.onclick = function() { navigateModal(-1); };
nextBtn.onclick = function() { navigateModal(1); };

loadMoreBtn.onclick = function() {
  const currentImages = galleryGrid.children.length;
  loadImages(currentImages, currentImages + 12); 
};


loadImages(0, 18);

