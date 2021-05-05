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

const refs = {
  galleryItem: document.querySelector(".gallery__item"),
  jsGal: document.querySelector(".js-gallery"),

  element: document.querySelector(".gallery__image"),

  lightbox: document.querySelector(".lightbox"),
  content: document.querySelector(".lightbox__image"),
  button: document.querySelector(".lightbox__button"),

  jsLight: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  content: document.querySelector(".lightbox__content"),

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

const createGallery = photos.map((img) => createGalleryMarkup(img)).join("");

refs.jsGal.innerHTML = createGallery;

// 2. Реализация делегирования на галерее ul.js-gallery
// и получение url большого изображения.

refs.jsGal.addEventListener("click", clickOnPicture);
// refs.button.addEventListener("click", closeModal);
refs.lightbox.addEventListener("click", openModal);

// element

function clickOnPicture(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains(".gallery__image")) {
    console.log("NOT click");
    return;
  }

  // console.log("OK");
  // openModal(evt);
  // openModal(evt);
}

function openModal(evt) {
  refs.lightbox.classList.add(".is-open");
  refs.content.src = evt.target.refs.galleryItem.data.sourse;
}

// function closeModal() {
//   refs.lightbox.classList.remove(".is-open");
// }

// refs.lightbox.classList.add(".is-open");

//
