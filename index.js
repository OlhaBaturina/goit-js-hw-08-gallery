import photos from "./gallery-items.js";
// console.log(photos[1]);

//
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку
// button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.

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
// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
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

// 2. Реализация делегирования на галерее ul.js-gallery
// и получение url большого изображения.

jsGalRef.addEventListener("click", clickOnPicture);
buttonRef.addEventListener("click", closeModal);

function clickOnPicture(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    console.log("NOT click");
    return;
  }

  currentEvtLi = evt.target.parentNode; //обращаемся к родителю елемента на к тором произошло событие - это li

  lightboxRef.classList.add("is-open");
  imageRef.src = evt.target.dataset.source;
  imageRef.alt = evt.target.alt;
}

function closeModal() {
  lightboxRef.classList.remove("is-open");
}

// lightboxRef.classList.add(".is-open");

//
