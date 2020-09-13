"use strict";

import gallery from "./gallery-items.js";

const galleryListRef = document.querySelector(".gallery");
const imgLargeRef = document.querySelector(".lightbox__image");
const modalRef = document.querySelector("div.lightbox");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const fragment = document.createDocumentFragment();

function getTags(tag, classes = {}, attributes = {}) {
  const element = document.createElement(tag);
  element.classList.add(classes);

  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  return element;
}

function createItem(el) {
  const element = getTags("li", "gallery__item");
  const link = getTags("a", "gallery__link", { href: `${el.original}` });
  const img = getTags("img", "gallery__image", {
    src: `${el.preview}`,
    "data-source": `${el.original}`,
    alt: `${el.description}`,
  });

  link.appendChild(img);
  element.appendChild(link);
  fragment.appendChild(element);
}

function createElementGallery(gallery) {
  const list = gallery.forEach((el, index) => {
    createItem(el);
  });

  galleryListRef.appendChild(fragment);
}

createElementGallery(gallery);

const setImgToModal = (src = "", alt = "") => {
  imgLargeRef.setAttribute("src", src);
  imgLargeRef.setAttribute("alt", alt);
};

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const { dataset = {}, alt = "" } = event.target;
  openModal(dataset.source, alt);
}

function openModal(url, alt) {
  window.addEventListener("keydown", onPressHandler);

  setImgToModal(url, alt);
  modalRef.classList.toggle("is-open");
}

function closeModal() {
  window.removeEventListener("keydown", onPressHandler);

  setImgToModal();
  modalRef.classList.toggle("is-open");
}

function showNextImg() {
  const current = gallery.findIndex((el) => el.original === imgLargeRef.src);
  const newIndex = gallery.find((el, i) => i === current + 1);

  if (newIndex === undefined) {
    imgLargeRef.src = gallery[0].original;
    imgLargeRef.alt = gallery[0].description;
    return setImgToModal(imgLargeRef.src, imgLargeRef.alt);
  }

  imgLargeRef.src = newIndex.original;
  imgLargeRef.alt = newIndex.description;

  return setImgToModal(imgLargeRef.src, imgLargeRef.alt);
}

function showPrevImg() {
  const current = gallery.findIndex((el) => el.original === imgLargeRef.src);
  const newIndex = gallery.find((el, i) => i === current - 1);

  if (current === 0) {
    imgLargeRef.src = gallery[gallery.length - 1].original;
    imgLargeRef.alt = gallery[gallery.length - 1].description;

    return setImgToModal(imgLargeRef.src, imgLargeRef.alt);
  }

  imgLargeRef.src = newIndex.original;
  imgLargeRef.alt = newIndex.description;

  return setImgToModal(imgLargeRef.src, imgLargeRef.alt);
}

function onPressHandler(e) {
  if (e.code === "Escape") closeModal();
  if (e.code === "ArrowLeft") showPrevImg();
  if (e.code === "ArrowRight") showNextImg();
}

galleryListRef.addEventListener("click", onGalleryClick);
imgLargeRef.addEventListener("click", (e) => {
  e.stopPropagation();
});
buttonCloseRef.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal();
});
modalRef.addEventListener("click", closeModal);
