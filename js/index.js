"use strict";

import gallery from './gallery-items.js';

const galleryListRef = document.querySelector('.gallery');
const imgLargeRef = document.querySelector('.lightbox__image');
const modalOpenRef = document.querySelector('div.lightbox');
const buttonCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const boxCloseRef = document.querySelector('div.lightbox__content');
const fragment = document.createDocumentFragment();


function createElementgallery(gallery) {

    const list = gallery.forEach((el, index) => {
    
        const element = document.createElement('li');
        const link = document.createElement('a');
        const img = document.createElement('img');

        element.classList.add("gallery__item");
        link.classList.add("gallery__link");
        link.setAttribute("href", `${el.original}`);
        img.classList.add("gallery__image");
        img.setAttribute("src", `${el.preview}`);
        img.setAttribute("data-source", `${el.original}`);
        img.setAttribute("alt", `${el.description}`);
        img.setAttribute("data-index", `${index}`);

        link.appendChild(img);
        element.appendChild(link);
        fragment.appendChild(element);
    });

    galleryListRef.appendChild(fragment);
};

createElementgallery(gallery);

const galleryLinkRef = document.querySelectorAll('.gallery__image');


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
    openModal(url, event.target);
};

function openModal(url, el) {
    window.addEventListener('keydown', closeESC);
    window.addEventListener('keydown', onKeydownLeftRight);
    
    el.classList.add('js-active');
    imgLargeRef.src = url;
    modalOpenRef.classList.toggle('is-open');
}

function closeModal() {
    window.removeEventListener('keydown', closeESC);
    window.removeEventListener('keydown', onKeydownLeftRight);

    const galleryImgRemoveRef = document.querySelector('.js-active');
    galleryImgRemoveRef.classList.remove('js-active');

    imgLargeRef.src = '';
    modalOpenRef.classList.toggle('is-open');
}

function closeESC(event) {
    if(event.code === 'Escape') {
        closeModal();
    }
}

function onKeydownLeftRight(event) {

    const activeImgRef = document.querySelector('.js-active');
    let index = +activeImgRef.getAttribute('data-index');

    if(event.code === 'ArrowRight' && index < 8) {
        index += 1;
        imgLargeRef.src = gallery[index].original;
        galleryLinkRef[index].classList.add('js-active');
        activeImgRef.classList.remove('js-active');
    }

    if(event.code === 'ArrowLeft' && index > 0) {
        index -= 1;
        imgLargeRef.src = gallery[index].original;
        galleryLinkRef[index].classList.add('js-active');
        activeImgRef.classList.remove('js-active');
    }
}