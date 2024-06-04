
//бугрер  
const navigation = document.querySelector('.navigation');
const burgerBtn = document.querySelector('.button__header');
const menuBtn = document.getElementById('menu__btn');
const body = document.body;

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('burger_active');
  navigation.classList.toggle('navigation__active')
  body.classList.toggle('lock');
})

navigation.querySelectorAll('.menu_link').forEach(link => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('burger_active');
    navigation.classList.remove('navigation__active');
    body.classList.remove('lock');
  })
})
// слайдер
const btnLeft = document.querySelector('.button__circle--left');
const btnRigth = document.querySelector('.button__circle--right');
const slidersLine = document.querySelector('.sliders__line');
const line = document.querySelector('.slider__controls');

let activLine = [];

if (line && line.children) {
  activLine = Array.from(line.children);
}
// let activLine = Array.from(line.children);
let position = 0;//смещение от левого края слайдера
let lineIndex = 0;
let slideInterval;


function nextSlide() {
  position += 501;
  lineIndex++;
  if (position > 1480) {
    position = 0;
    lineIndex = 0;
  }
  if (slidersLine) {
    slidersLine.style.left = -position + 'px';
  }

  thisSlider(lineIndex);

};

function prevSlide() {
  btnLeft.style.backgroundColor = 'green';
  position -= 501;
  lineIndex--;
  if (position < 0) {
    position = 1003;
    lineIndex = activLine.length - 1;
  }
  slidersLine.style.left = -position + 'px';
  thisSlider(lineIndex);
}

function thisSlider(index) {
  activLine.forEach((line, idx) => {
    line.value = 0;
    line.classList.remove('line__active');
  });
  if (activLine[index]) {
    activLine[index].classList.add('line__active');
    progress(7, index);
  }

}
function nextSlideProgres() {
  clearCurrentInterval(); // Очищаем текущий интервал
  nextSlide();
  thisSlider(lineIndex);
  startSlideShow();// Перезапускаем интервал
}

//кнопки переключения

if (btnRigth) {
  btnRigth.addEventListener('click', nextSlideProgres);
}
if (btnLeft) {
  btnLeft.addEventListener('click', function () {
    clearCurrentInterval(); // Очищаем текущий интервал
    prevSlide();
    thisSlider(lineIndex);
    startSlideShow(); // Перезапускаем интервал
  });
}

function startSlideShow() {
  // Очистка существующего интервала перед его перезапуском
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(nextSlideProgres, 7000);
}
// заливка прогресс-бар 
function progress(time, index, startProgress = 0) {
  let progressElement = activLine[index];
  // let start = 0;
  let progressValue = startProgress;
  // time = Math.round(time * 10);
  let stepTime = (time * 1000) / 100;
  clearCurrentInterval();

  progressElement.intervalId = setInterval(function () {
    if (progressValue >= 100) {
      clearInterval(progressElement.intervalId);
      let nextIndex = (index + 1) % activLine.length; // Вычисление следующего индекса
      thisSlider(nextIndex);
    } else {
      progressElement.value = progressValue;
      progressValue++;
    }

  }, stepTime);

}

// очистка интtрвала(прогресс бара) и остановка
function clearCurrentInterval() {
  let activeProgressElement = document.querySelector('.line.line__active');
  if (activeProgressElement && activeProgressElement.intervalId) {
    clearInterval(activeProgressElement.intervalId);
    activeProgressElement.intervalId = null; // Сброс id интервала
  }
}
thisSlider(0);
startSlideShow();

// пауза при наведении или нажатии
let remainingTime = 7000; // Изначально полное время до переключения
let lastTime = Date.now(); // Время последнего обновления
let progressPaused = false;
let savedProgress = 0;//текущее место

// остановка слайд-шоу
function pauseSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    // Обновляем remainingTime на основе времени, прошедшего с последнего обновления
    remainingTime -= Date.now() - lastTime;
  }

  let activeProgressElement = document.querySelector('.line.line__active');
  if (activeProgressElement && activeProgressElement.intervalId) {
    clearInterval(activeProgressElement.intervalId);
    savedProgress = activeProgressElement.value;
    progressPaused = true;
  }
}

// Функция для возобновления слайд-шоу
function resumeSlideShow() {
  if (!slideInterval) {
    slideInterval = setInterval(nextSlideProgres, remainingTime);
    lastTime = Date.now(); // Сброс времени обновления

    setTimeout(() => {
      remainingTime = 7000;
      startSlideShow();
    }, remainingTime);
  }

  if (progressPaused) {
    let activeProgressElement = document.querySelector('.line.line__active');
    if (activeProgressElement) {
      progress(remainingTime / 1000, lineIndex, savedProgress); // Возобновляем с сохраненного прогресса
      progressPaused = false;
    }
  }
}

// Добавление обработчиков событий
const sliderElements = document.querySelectorAll('.sliders__line');

sliderElements.forEach(elem => {
  elem.addEventListener('mouseenter', pauseSlideShow);
  elem.addEventListener('mouseleave', resumeSlideShow);
  elem.addEventListener('touchstart', pauseSlideShow);
  elem.addEventListener('touchend', resumeSlideShow);
});

// модальное окно
const modal = document.querySelector('.modal');
const closeMod = document.querySelector('.owerlay');
const modalBtn = document.querySelector('.modal__btn');

if (modalBtn) {
  modalBtn.addEventListener('click', closeModal);
}
if (closeMod) {
  closeMod.addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('modal__menu-active');
  document.body.classList.remove('stop__scroll');
  // удаляем нажатый чекбокс
  const additivesElement = document.querySelector('.additives');//получили все елементы с классом .additives 
  const additivesInput = additivesElement.querySelectorAll('.modal__tabs input');// из них получили только инпуты
  //во всех инпутах идалили нажатый чекбокс
  for (let i = 0; i < additivesInput.length; i++) {
    additivesInput[i].checked = false;;
  }
  // удаляем нажатый радиобат
  const radioBtn = document.querySelectorAll('input[name="modal__size"]');
  for (let i = 1; i < radioBtn.length; i++) {
    radioBtn[i].checked = false;
    radioBtn[0].checked = true;
  }

}



// пример эл-та
const coffeeList = [
  {
    "name": "Irish coffee",
    "description": "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    "price": "7.00",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Kahlua coffee",
    "description": "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
    "price": "7.00",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Honey raf",
    "description": "Espresso with frothed milk, cream and aromatic honey",
    "price": "5.50",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Ice cappuccino",
    "description": "Cappuccino with soft thick foam in summer version with ice",
    "price": "5.00",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Espresso",
    "description": "Classic black coffee",
    "price": "4.50",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Latte",
    "description": "Espresso coffee with the addition of steamed milk and dense milk foam",
    "price": "5.50",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Latte macchiato",
    "description": "Espresso with frothed milk and chocolate",
    "price": "5.50",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Coffee with cognac",
    "description": "Fragrant black coffee with cognac and whipped cream",
    "price": "6.50",
    "category": "coffee",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Cinnamon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Moroccan",
    "description": "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
    "price": "4.50",
    "category": "tea",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Lemon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Ginger",
    "description": "Original black tea with fresh ginger, lemon and honey",
    "price": "5.00",
    "category": "tea",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Lemon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Cranberry",
    "description": "Invigorating black tea with cranberry and honey",
    "price": "5.00",
    "category": "tea",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Lemon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Sea buckthorn",
    "description": "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
    "price": "5.50",
    "category": "tea",
    "sizes": {
      "s": {
        "size": "200 ml",
        "add-price": "0.00"
      },
      "m": {
        "size": "300 ml",
        "add-price": "0.50"
      },
      "l": {
        "size": "400 ml",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Sugar",
        "add-price": "0.50"
      },
      {
        "name": "Lemon",
        "add-price": "0.50"
      },
      {
        "name": "Syrup",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Marble cheesecake",
    "description": "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
    "price": "3.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Red velvet",
    "description": "Layer cake with cream cheese frosting",
    "price": "4.00",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Cheesecakes",
    "description": "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
    "price": "4.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Creme brulee",
    "description": "Delicate creamy dessert in a caramel basket with wild berries",
    "price": "4.00",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Pancakes",
    "description": "Tender pancakes with strawberry jam and fresh strawberries",
    "price": "4.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Honey cake",
    "description": "Classic honey cake with delicate custard",
    "price": "4.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Chocolate cake",
    "description": "Cake with hot chocolate filling and nuts with dried apricots",
    "price": "5.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  },

  {
    "name": "Black forest",
    "description": "A combination of thin sponge cake with cherry jam and light chocolate mousse",
    "price": "6.50",
    "category": "dessert",
    "sizes": {
      "s": {
        "size": "50 g",
        "add-price": "0.00"
      },
      "m": {
        "size": "100 g",
        "add-price": "0.50"
      },
      "l": {
        "size": "200 g",
        "add-price": "1.00"
      }
    },
    "additives": [
      {
        "name": "Berries",
        "add-price": "0.50"
      },
      {
        "name": "Nuts",
        "add-price": "0.50"
      },
      {
        "name": "Jam",
        "add-price": "0.50"
      }
    ]
  }
];


const coffeeImgs = ['../image/img/coffee-1.jpg',
  '../image/img/coffee-2.jpg',
  '../image/img/coffee-3.jpg',
  '../image/img/coffee-4.jpg',
  '../image/img/coffee-5.jpg',
  '../image/img/coffee-6.jpg',
  '../image/img/coffee-7.jpg',
  '../image/img/coffee-8.jpg',
  '../image/img/tea-1.png',
  '../image/img/tea-2.png',
  '../image/img/tea-3.png',
  '../image/img/tea-4.png',
  '../image/img/dessert-1.png',
  '../image/img/dessert-2.png',
  '../image/img/dessert-3.png',
  '../image/img/dessert-4.png',
  '../image/img/dessert-5.png',
  '../image/img/dessert-6.png',
  '../image/img/dessert-7.png',
  '../image/img/dessert-8.png',
];
// function rendorCards() {
//   for (let i = 0; i < coffeeList.length - 1; i++) {
//     const coffee = coffeeList[i];
//     const
//   }
// }

const coffeeCardsCollection = document.querySelectorAll('.menu__box');
let coffeeCards = Array.from(coffeeCardsCollection);
for (let i = 0; i < coffeeCards.length; i++) {
  let coffeeCard = coffeeCards[i];
  let coffeeData = coffeeList[i];
  let coffeeImg = coffeeImgs[i];

  coffeeCard.addEventListener('click', () => {
    document.body.classList.add('stop__scroll');
    modal.classList.add('modal__menu-active');
    modal.querySelector('.box__title').innerHTML = coffeeData.name;
    modal.querySelector('.result').innerHTML = '$' + coffeeData.price;
    modal.querySelector('.modal__photo').setAttribute('src', coffeeImg);

    const sizeElement = document.querySelector('.size');
    const additivesElement = document.querySelector('.additives');
    const sizeLabels = sizeElement.querySelectorAll('.modal__tabs label');
    const additivesLabels = additivesElement.querySelectorAll('.modal__tabs label');

    for (let i = 0; i < sizeLabels.length; i++) {
      let size = coffeeData.sizes[Object.keys(coffeeData.sizes)[i]];
      sizeLabels[i].querySelector('span').textContent = Object.keys(coffeeData.sizes)[i].toUpperCase();

      let elementToRemove = sizeLabels[i].lastChild;
      if (elementToRemove) {
        // Удаляем элемент из родительского элемента
        sizeLabels[i].removeChild(elementToRemove);
      }
      sizeLabels[i].appendChild(document.createTextNode(size.size));
    }

    for (let i = 0; i < additivesLabels.length; i++) {
      let additives = coffeeData.additives[Object.keys(coffeeData.additives)[i]];

      let elementToRemove = additivesLabels[i].lastChild;
      if (elementToRemove) {
        // Удаляем элемент из родительского элемента
        additivesLabels[i].removeChild(elementToRemove);
      }
      additivesLabels[i].appendChild(document.createTextNode(additives.name));
    }

  })
}








//исчезновение кнопки в моб. версии
const refreshBtn = document.querySelector('.menu__refresh-button');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    const elementsToToggle = document.querySelectorAll('.tabs__block .menu__box:nth-child(n+5)');
    elementsToToggle.forEach((element) => {
      element.style.display = 'flex';
    });
    refreshBtn.style.display = 'none';
  })
}

