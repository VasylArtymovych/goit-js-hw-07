import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

galleryRef.addEventListener('click', onGalleryImgClick);

function onGalleryImgClick(evt) {
    evt.preventDefault();
    
    if (evt.target.nodeName !== 'IMG') {
        return;
    };

    const modalImgToShow = evt.target.dataset.source;

    const instance = basicLightbox.create(`
    <img src="${modalImgToShow}" width="800" height="600">`, 
    {
        closable: true,
        onShow: (instance) => { window.addEventListener('keydown', onModalPressEsc) },
        onClose: (instance) => {window.removeEventListener('keydown', onModalPressEsc)},
    });
    
    instance.show();

    function onModalPressEsc(evt) {
    const isEsc = evt.code === 'Escape';
    
    if (isEsc) {
        instance.close();
        }
    };
};

function createGalleryMarkup(obj) {
    const murkup = obj.map(createGalleryElement).join('');
    
    galleryRef.innerHTML = murkup;
};
createGalleryMarkup(galleryItems);

function createGalleryElement({preview, original, description}) { 
    const element = `<a class="gallery__link" href='${original}'><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a>`;
    return element;
};
