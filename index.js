import gallery from "./gallery-items.js";
console.log(gallery);

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
const galleryMarkup = createGalleryMarkup(gallery);
console.log(createGalleryMarkup(gallery[1]));
refs.gallery.insertAdjacentElement("beforeend", galleryMarkup);

function createGalleryMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"`
    )
    .join("");
}

{
  /* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>; */
}
