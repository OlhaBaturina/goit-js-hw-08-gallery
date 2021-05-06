import photos from "./gallery-items.js";

// Открываем доступ к селлекторам
const jsGalRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".lightbox");
const imageRef = document.querySelector(".lightbox__image");
const buttonRef = document.querySelector(".lightbox__button");
const overlayRef = document.querySelector(".lightbox__overlay");

// Текущая картинка
let currentElement;

// Создание HTML разметки для каждого элемента
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

// Перебираем массив разметки по элементам, превращаем в строку
const createGallery = photos.map((img) => createGalleryMarkup(img)).join("");

// Отправляем разметку в DOM
jsGalRef.innerHTML = createGallery;

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

  currentElement = evt.target.parentNode; //задаем переменной значение "текущей картинки" значени родителя елемента

  lightboxRef.classList.add("is-open"); //Вешаем класс открытия модалки

  imageRef.src = evt.target.dataset.source; // Добавляем значения атрибутов на картинки
  imageRef.alt = evt.target.alt;

  window.addEventListener("keydown", clickOnEscKey); // Вешаем слушатели при открытии модалки на кнопки Esc и Arrow
  window.addEventListener("keydown", clickOnArrowKey);
}

// Функция закрытия модалки
function closeModal() {
  lightboxRef.classList.remove("is-open"); //  Снимаем класс модалки

  imageRef.src = ""; // Очищаем значение атрибутов картинок
  imageRef.alt = "";

  window.removeEventListener("keydown", clickOnEscKey); // Снимаем слушатели с кнопок Esc и Arrow
  window.removeEventListener("keydown", clickOnArrowKey);
}

// Функция закрытия модалки по клику на оверлей
function closeModalOnOverley(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}

// Функция закрытия модалки по клику на "Escape"
function clickOnEscKey(evt) {
  if (evt.code === "Escape") {
    closeModal();
  }
}

// Функция перелистывания с помощью кнопок "ArrowRight" и "ArrowLeft"
function clickOnArrowKey(evt) {
  if (evt.code === "ArrowRight") {
    let leftBtn = currentElement.nextElementSibling; //присваиваем следующий элемент(li)

    if (!leftBtn) {
      leftBtn = jsGalRef.firstElementChild; //если следующего элемента нет - подставляем первый
    }

    imageRef.src = leftBtn.lastElementChild.dataset.source; //присваиваем текущему значению картинку
    currentElement = leftBtn;
  }
  if (evt.code === "ArrowLeft") {
    let rightBtn = currentElement.previousElementSibling;

    if (!rightBtn) {
      rightBtn = jsGalRef.lastElementChild;
    }

    imageRef.src = rightBtn.lastElementChild.dataset.source;
    currentElement = rightBtn;
  }
}
