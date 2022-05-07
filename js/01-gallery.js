import { galleryItems } from './gallery-items.js';
let currentIndex = 0;
const galleryRef = document.querySelector('.gallery');

const instance = basicLightbox.create(`
    <img src="" width="800" height="600">`, 
    {
        closable: true,
        onShow: (instance) => { window.addEventListener('keydown', onModalPressEsc) },
        onClose: (instance) => {window.removeEventListener('keydown', onModalPressEsc)},
    });

galleryRef.addEventListener('click', onGalleryImgClick);

function onGalleryImgClick(evt) {
    evt.preventDefault();
    
    if (evt.target.nodeName !== 'IMG') {
        return;
    };

    let imgToShow = evt.target.dataset.source;
    currentIndex = Number( evt.target.dataset.action);

    setUrl(imgToShow);
    instance.show();
};

function onModalPressEsc(evt) {
    
    switch (evt.code){
        case 'Escape': 
            instance.close();
        break;
        case 'ArrowRight':
            currentIndex += 1
            if(currentIndex > galleryItems.length - 1){
                currentIndex = 0;
            }
            setUrl(galleryItems[currentIndex].original);
        break;
        case 'ArrowLeft': 
            currentIndex -=1;
            if (currentIndex < 0){
                currentIndex = galleryItems.length - 1;
            }
            setUrl(galleryItems[currentIndex].original);
        break;
        default: console.log('press Right or Left');
    }
};

function setUrl(url){
    instance.element().querySelector('img').src = url;
};    

function createGalleryMarkup(obj) {
    const murkup = obj.map(createGalleryElement).join('');
    galleryRef.innerHTML = murkup;
};
createGalleryMarkup(galleryItems);

function createGalleryElement({preview, original, description}, index) { 
    return `<a class="gallery__link" href='${original}'>
    <img 
    class="gallery__image" 
    src="${preview}" 
    data-source="${original}" 
    data-action="${index}"
    alt="${description}">
    </a>`; 
};
