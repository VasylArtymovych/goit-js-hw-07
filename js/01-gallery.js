import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const galleryRefs = document.querySelector('.gallery');

galleryRefs.addEventListener('click', onGalleryImgClick);

function onGalleryImgClick(evt) {
    evt.preventDefault();
    
    if (evt.target.nodeName !== 'IMG') {
        return;
    };

    const modalImg = evt.target.dataset.source;

    const instance = basicLightbox.create(`
    <img src="${modalImg}" width="800" height="600">
`, { closable: true });
    
    instance.show(() => window.addEventListener('keydown', onModalPressEsc));

    function onModalPressEsc(evt) {
    const isEsc = evt.code === 'Escape';
    
    if (isEsc) {
        instance.close(() => window.removeEventListener('keydown', onModalPressEsc));
        }
    };
};

function createGalleryMarkup(obj) {
    const murkup = obj.map(createGalleryElement).join('');
    
    galleryRefs.innerHTML = murkup;
};
createGalleryMarkup(galleryItems);

function createGalleryElement({preview, original, description}) { 
    const element = `<a class="gallery__link" href='${original}'><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a>`;
    return element;
};
