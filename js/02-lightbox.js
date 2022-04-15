import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

function addGalleryItemsImgs(obj) {
    const gallery = obj.map(createGalleryElement).join('');

    galleryRef.innerHTML = gallery;
}
addGalleryItemsImgs(galleryItems);

function createGalleryElement({preview, original, description}) {
    return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"></a>`
};

let gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 20, });
