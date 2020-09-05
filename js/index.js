"use strict";

import gallery from './gallery-items.js';

// --------------------   ВАРИАНТ - 1 --------------------

// Слайдер с методом findIndex


// const galleryListRef = document.querySelector('.gallery');
// const imgLargeRef = document.querySelector('.lightbox__image');
// const modalRef = document.querySelector('div.lightbox');
// const buttonCloseRef = document.querySelector('button[data-action="close-lightbox"]');
// const  imgArray =  gallery.map(el => el.original);


// const getElementGallery = (href, src, original, alt) => 

//     `<li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${href}"
//   >
//     <img
//       class="gallery__image"
//       src="${src}"
//       data-source="${original}"
//       alt="${alt}"
//     />
//   </a>
// </li>`;

// const getListGallery = () => gallery.reduce((acc, { preview, original, description }) => acc + getElementGallery(original, preview, original, description), "");

// galleryListRef.innerHTML = getListGallery();


// const getTags = (tag, attributes = {}) => {

//     const element = document.createElement('tag');

//     for (const attribute in attributes) {
//         element.setAttribute(attribute, attributes[attribute]);
//     }
    
//     return element;
// };

// const setImgToModal = (src = "", alt = "") => {
//     imgLargeRef.setAttribute("src", src);
//     imgLargeRef.setAttribute("alt", alt);
//   };


// const onGalleryClick = (event) => {
//     event.preventDefault();

//     if(event.target.nodeName !== "IMG") {
//         return;
//     }

//     const { dataset = {}, alt = "" } = event.target;
//     openModal(dataset.source, alt);
// }


// const openModal = (url, alt) => {
//     window.addEventListener('keydown', closeESC);
    

//     setImgToModal(url, alt)
//     modalRef.classList.toggle('is-open');
// }

// const closeModal = () => {
//     window.removeEventListener('keydown', closeESC);

//     setImgToModal();
//     modalRef.classList.toggle('is-open');
// }

// const closeESC = (event) => {
//     if(event.code === 'Escape') {
//         closeModal();
//     }
// }

// const showNextImg = () => {

//     let nextImgIndex = +imgArray.findIndex(currentValue => currentValue === imgLargeRef.src);

//     if (nextImgIndex < gallery.length) {
//         nextImgIndex += 1;
//         setImgToModal(gallery[nextImgIndex].original, gallery[nextImgIndex].description);
//     }
//   };
  
// const showPrevImg = () => {

//     let prevImgIndex = imgArray.findIndex(currentValue => currentValue === imgLargeRef.src);

//     if (prevImgIndex > 0) {
//         prevImgIndex -= 1;
//         setImgToModal(gallery[prevImgIndex].original, gallery[prevImgIndex].description);
//     }
// };

// galleryListRef.addEventListener('click', onGalleryClick);
// imgLargeRef.addEventListener("click", (e) => {
//     e.stopPropagation();
//   });
// buttonCloseRef.addEventListener('click', (e) => {
//     e.stopPropagation();
//     closeModal();
// });
// modalRef.addEventListener("click", closeModal);
// window.addEventListener('keydown', (e) => {
//     e.keyCode === 39 && showNextImg();
//     e.keyCode === 37 && showPrevImg();
// });


// ------------    Вариант - 2 --------------


const galleryListRef = document.querySelector('.gallery');
const imgLargeRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('div.lightbox');
const buttonCloseRef = document.querySelector('button[data-action="close-lightbox"]');


const getElementGallery = (href, src, original, alt, index) => 

    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${href}"
  >
    <img
      class="gallery__image"
      src="${src}"
      data-source="${original}"
      alt="${alt}"
      data-index="${index}"
    />
  </a>
</li>`;

const getListGallery = () => gallery.reduce((acc, { preview, original, description }, index) => acc + getElementGallery(original, preview, original, description, index), "");

galleryListRef.innerHTML = getListGallery();


const getTags = (tag, attributes = {}) => {

    const element = document.createElement('tag');

    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
    
    return element;
};

const setImgToModal = (src = "", alt = "", index="") => {
    imgLargeRef.setAttribute("src", src);
    imgLargeRef.setAttribute("alt", alt);
    imgLargeRef.setAttribute("data-index", index);
  };


const onGalleryClick = (event) => {
    event.preventDefault();

    if(event.target.nodeName !== "IMG") {
        return;
    }

    const { dataset = {}, alt = "" } = event.target;
    openModal(dataset.source, alt, dataset.index);
}


const openModal = (url, alt, index) => {
    window.addEventListener('keydown', closeESC);
    setImgToModal(url, alt, index)
    modalRef.classList.toggle('is-open');
}

const closeModal = () => {
    window.removeEventListener('keydown', closeESC);
    setImgToModal();
    modalRef.classList.toggle('is-open');
}

const closeESC = (event) => {
    if(event.code === 'Escape') {
        closeModal();
    }
}

const showNextImg = () => {
    const nextImgIndex = +imgLargeRef.dataset.index + 1;

    if (nextImgIndex < gallery.length) {
        setImgToModal(gallery[nextImgIndex].original, gallery[nextImgIndex].description, nextImgIndex);
    }
  };
  
const showPrevImg = () => {
    const prevImgIndex = imgLargeRef.dataset.index - 1;

    if (prevImgIndex >= 0) {
        setImgToModal(gallery[prevImgIndex].original, gallery[prevImgIndex].description, prevImgIndex);
    }
};

galleryListRef.addEventListener('click', onGalleryClick);
imgLargeRef.addEventListener("click", (e) => {
    e.stopPropagation();
  });
buttonCloseRef.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
});
modalRef.addEventListener("click", closeModal);
window.addEventListener('keydown', (e) => {
    e.keyCode === 39 && showNextImg();
    e.keyCode === 37 && showPrevImg();
});


// ------------    Вариант - 3 --------------


// const galleryListRef = document.querySelector('.gallery');
// const imgLargeRef = document.querySelector('.lightbox__image');
// const modalOpenRef = document.querySelector('div.lightbox');
// const buttonCloseRef = document.querySelector('button[data-action="close-lightbox"]');
// const boxCloseRef = document.querySelector('div.lightbox__content');
// const fragment = document.createDocumentFragment();


// function createElementgallery(gallery) {

//     const list = gallery.forEach((el, index) => {
    
//         const element = document.createElement('li');
//         const link = document.createElement('a');
//         const img = document.createElement('img');

//         element.classList.add("gallery__item");
//         link.classList.add("gallery__link");
//         link.setAttribute("href", `${el.original}`);
//         img.classList.add("gallery__image");
//         img.setAttribute("src", `${el.preview}`);
//         img.setAttribute("data-source", `${el.original}`);
//         img.setAttribute("alt", `${el.description}`);
//         img.setAttribute("data-index", `${index}`);

//         link.appendChild(img);
//         element.appendChild(link);
//         fragment.appendChild(element);
//     });

//     galleryListRef.appendChild(fragment);
// };

// createElementgallery(gallery);


// const galleryLinkRef = document.querySelectorAll('.gallery__image');


// galleryListRef.addEventListener('click', onGalleryClick);
// buttonCloseRef.addEventListener('click', closeModal);
// boxCloseRef.addEventListener('click', closeModal);


// function onGalleryClick(event) {
//     event.preventDefault();

//     if(event.target.nodeName !== "IMG") {
//         return;
//     }

//     const url = event.target.dataset.source;
//     openModal(url, event.target);
// };

// function openModal(url, el) {
//     window.addEventListener('keydown', closeESC);
//     window.addEventListener('keydown', onKeydownLeftRight);

//     el.classList.add('js-active');
//     imgLargeRef.src = url;
//     modalOpenRef.classList.toggle('is-open');
// }

// function closeModal() {
//     window.removeEventListener('keydown', closeESC);
//     window.removeEventListener('keydown', onKeydownLeftRight);

//     const galleryImgRemoveRef = document.querySelector('.js-active');
//     galleryImgRemoveRef.classList.remove('js-active');

//     imgLargeRef.src = '';
//     modalOpenRef.classList.toggle('is-open');
// }

// function closeESC(event) {
//     if(event.code === 'Escape') {
//         closeModal();
//     }
// }

// function onKeydownLeftRight(event) {

//     const activeImgRef = document.querySelector('.js-active');
//     let index = +activeImgRef.getAttribute('data-index');

//     if(event.code === 'ArrowRight' && index < 8) {
//         index += 1;
//         imgLargeRef.src = gallery[index].original;
//         galleryLinkRef[index].classList.add('js-active');
//         activeImgRef.classList.remove('js-active');
//     }

//     if(event.code === 'ArrowLeft' && index > 0) {
//         index -= 1;
//         imgLargeRef.src = gallery[index].original;
//         galleryLinkRef[index].classList.add('js-active');
//         activeImgRef.classList.remove('js-active');
//     }
// }