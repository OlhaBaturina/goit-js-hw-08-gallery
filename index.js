import photos from "./gallery-items.js";

const galleryItemRef = document.querySelector(".gallery__item");
const jsGalRef = document.querySelector(".js-gallery");

const elementRef = document.querySelector(".gallery__image");

const lightboxRef = document.querySelector(".lightbox");
const imageRef = document.querySelector(".lightbox__image");
const buttonRef = document.querySelector(".lightbox__button");

const jsLightRef = document.querySelector(".js-lightbox");
const overlayRef = document.querySelector(".lightbox__overlay");
const contentRef = document.querySelector(".lightbox__content");

const closeRef = document.querySelector('[data-action="close-lightbox"]');

let currentEvtLi;

const createGalleryMarkup = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}" 
      />
  </a>
</li>
      `;
};

const createGallery = photos.map((img) => createGalleryMarkup(img)).join("");

jsGalRef.innerHTML = createGallery;

jsGalRef.addEventListener("click", clickOnPicture);
buttonRef.addEventListener("click", closeModal);

function clickOnPicture(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    console.log("NOT click");
    return;
  }

  currentEvtLi = evt.target.parentNode;

  lightboxRef.classList.add("is-open");
  imageRef.src = evt.target.dataset.source;
  imageRef.alt = evt.target.alt;
}

function closeModal() {
  lightboxRef.classList.remove("is-open");
  imageRef.src = "";
  imageRef.alt = "";
}
