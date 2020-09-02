"use strict";

import gallery from './gallery-items.js';

const galleryListRef = document.querySelector('.gallery');
const imgLargeRef = document.querySelector('.lightbox__image');
const modalOpenRef = document.querySelector('div.lightbox');
const buttonCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const boxCloseRef = document.querySelector('div.lightbox__content');
const fragment = document.createDocumentFragment();
const arrayPhotos = [];



function createElementgallery(gallery) {

    const list = gallery.forEach((el, index) => {
    
        const element = document.createElement('li');
        const link = document.createElement('a');
        const img = document.createElement('img');

        element.classList.add("gallery__item");
        link.classList.add("gallery__link");
        link.setAttribute("href", `${el.original}`);
        link.setAttribute("data-index", `${index}`);
        img.classList.add("gallery__image");
        img.setAttribute("src", `${el.preview}`);
        img.setAttribute("data-source", `${el.original}`);
        img.setAttribute("alt", `${el.description}`);

        link.appendChild(img);
        element.appendChild(link);
        fragment.appendChild(element);
    });

    galleryListRef.appendChild(fragment);
};

createElementgallery(gallery);
const galleryLinkRef = document.querySelector('.gallery__link');
console.log(galleryLinkRef);


galleryListRef.addEventListener('click', onGalleryClick);
buttonCloseRef.addEventListener('click', closeModal);
boxCloseRef.addEventListener('click', closeModal);


function onGalleryClick(event) {
    event.preventDefault();

    if(event.target.nodeName !== "IMG") {
        return;
    }

    const imageRef = event.target;
    const url = imageRef.dataset.source;
    openModal(url);
};

function openModal(url) {
    window.addEventListener('keydown', closeESC);
    window.addEventListener('keydown', onScrollLeftRight);
    imgLargeRef.src = url;
    modalOpenRef.classList.toggle('is-open');
}

function closeModal() {
    window.removeEventListener('keydown', closeESC);
    window.removeEventListener('keydown', onScrollLeftRight);
    imgLargeRef.src = '';
    modalOpenRef.classList.toggle('is-open');
}

function closeESC(event) {
    if(event.code === 'Escape') {
        closeModal();
    }
}

function onScrollLeftRight(event) {

    if(event.code === 'ArrowRight') {

        let index = +galleryLinkRef.getAttribute('data-index');
        index += 1;
        imgLargeRef.src = arrayPhotos[index];

    }
}


function arrayOfPhotos(gallery) {
    const array = gallery.map(el => {
        arrayPhotos.push(el.original);
    });
    console.log(arrayPhotos);
}

arrayOfPhotos(gallery);