import photos from "./gallery-items.js";

// Открываем доступ к селлекторам
const jsGalRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".lightbox");
const imageRef = document.querySelector(".lightbox__image");
const buttonRef = document.querySelector(".lightbox__button");
const overlayRef = document.querySelector(".lightbox__overlay");

// Создание HTML разметки для каждого элемента
const createGalleryMarkup = ({ preview, original, description }, index) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}" 
      />
  </a>
</li>
      `;
};

// Перебираем массив разметки по элементам, превращаем в строку
const createGallery = photos
  .map((img, index) => createGalleryMarkup(img, index))
  .join("");

// Отправляем разметку в DOM
jsGalRef.innerHTML = createGallery;

// Открываем доступ к галерее
const linkRef = document.querySelectorAll(".gallery__link");

// Распыляем картинки в массив, опеределяем длину массива и текущий индекс
const arrayLinkRef = [...linkRef];
const linkRefLength = arrayLinkRef.length;
let indexEl = 0;

// Вещаем слушатели на оверлей, модалку и картинку-превью
jsGalRef.addEventListener("click", clickOnPicture);
buttonRef.addEventListener("click", closeModal);
overlayRef.addEventListener("click", closeModalOnOverley);

// Функция открытия модалки
function clickOnPicture(evt) {
  evt.preventDefault(); // Убираем дефолтные события браузера

  if (!evt.target.classList.contains("gallery__image")) {
    return; // Делегируем событие клика с контейнера на картинку
  }

  //задаем индекс текущей картинки
  indexEl = arrayLinkRef.indexOf(evt.target.closest(".gallery__link"));

  //Вешаем класс открытия модалки
  lightboxRef.classList.add("is-open");

  // Добавляем значения атрибутов на картинки
  imageRef.src = evt.target.dataset.source;
  imageRef.alt = evt.target.alt;

  // Вешаем слушатели при открытии модалки на кнопки Esc и Arrow
  window.addEventListener("keydown", clickOnKey);
}

// Функция закрытия модалки
function closeModal() {
  lightboxRef.classList.remove("is-open"); //  Снимаем класс модалки

  imageRef.src = ""; // Очищаем значение атрибутов картинок
  imageRef.alt = "";

  window.removeEventListener("keydown", clickOnKey); // Снимаем слушатели с кнопок Esc и Arrow
}

// Функция закрытия модалки по клику на оверлей
function closeModalOnOverley(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}

// Функция закрытия модалки по клику на "Escape"
function clickOnKey(evt) {
  if (evt.code === "Escape") {
    closeModal();
  }

  // перелистывание при нажатии ArrowRight
  if (evt.code === "ArrowRight" && indexEl < linkRefLength - 1) {
    imageRef.src = arrayLinkRef[indexEl + 1].href;
    indexEl += 1;
  }

  // перелистывание при нажатии ArrowLeft
  if (evt.code === "ArrowLeft" && indexEl > 0) {
    imageRef.src = arrayLinkRef[indexEl - 1].href;
    indexEl -= 1;
  }
}
