import photos from "./gallery-items.js";
// console.log(photos[1]);

// 2. Реализация делегирования на галерее ul.js-gallery
// и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку
// button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.

const refs = {
  gallery: document.querySelector("gallery"),
  jsGal: document.querySelector("js-gallery"),
  lightbox: document.querySelector("lightbox"),
  jsLight: document.querySelector("js-lightbox"),
  overlay: document.querySelector("lightbox__overlay"),
  content: document.querySelector("lightbox__content"),
  content: document.querySelector("lightbox__image"),
  button: document.querySelector("lightbox__button"),
  close: document.querySelector('[data-action="close-lightbox"]'),
};
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
// console.log(createGalleryMarkup(photos[1]));

const createGallery = photos.map((img) => createGalleryMarkup(img)).join("");

console.log(createGallery);

refs.jsGal.insertAdjacentElement("afterbegin", createGallery);
