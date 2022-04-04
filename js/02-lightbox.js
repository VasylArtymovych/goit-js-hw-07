import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');



galleryRef.addEventListener('click', onImageClick)

function onImageClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") return;

    let gallery = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});
    gallery.open(evt.target);
    
}


function addGalleryItemsImgs(obj) {
    const gallery = obj.map(createGalleryElement).join('');

    galleryRef.innerHTML = gallery;
}
addGalleryItemsImgs(galleryItems);

function createGalleryElement({preview, original, description}) {
    return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"></a>`
};