import {
  time,
  date,
  greeting,
  name,
  city,
  slideNext,
  slidePrev,
  weatherIcon,
  temperature,
  weatherDescription,
  quote,
  author,
  buttonChangeQuote,
  buttonPlayPrev,
  buttonPlay,
  buttonPlayNext,
  playListContainer,
} from "./constants.js";
import playList from "./playList.js";

function getTimeOfDay() {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 12) {
    return "morning";
  }
  if (hours >= 12 && hours < 18) {
    return "afternoon";
  }
  if (hours >= 18 && hours <= 23) {
    return "evening";
  }
  if (hours >= 0 && hours < 6) {
    return "night";
  }
}

/*---------------- TASK 1 и 2:  Приветствие. Часы и календарь ----------------*/
function showGreeting() {
  getTimeOfDay();

  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}

// Дата
function showDate() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-US", options);
  date.textContent = currentDate;
}

//Время
function showTime() {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

// перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

// перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);

/*---------------- TASK 3:  Слайдер изображений ----------------*/

//возвращающую рандомное число от 1 до 20 включительно
function getRandomNum(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
let randomNum = getRandomNum(1, 20);

// функция, обновляющая фоновое изображение
function setBg(num) {
  let timeOfDay = getTimeOfDay();
  let bgNum = num.toString().padStart(2, "0");

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg(randomNum);

//функции для переключения слайда
function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else randomNum += 1;
  setBg(randomNum);
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else randomNum -= 1;
  setBg(randomNum);
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

/*---------------- TASK 4:  Виджет погоды ----------------*/

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=e46cf0673724ffb169bf8717c98cbe1f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

city.addEventListener("keypress", setCity);

/*---------------- TASK 5:  Виджет "цитата дня" ----------------*/

async function getQuotes() {
  const quotes = "scripts/quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();

  const randomQuote = getRandomNum(0, data.length - 1);
  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;
}

getQuotes();

buttonChangeQuote.addEventListener("click", getQuotes);

/*---------------- TASK 6:  Аудиоплеер ----------------*/

let isPlay = false;

const audio = new Audio();
let playNum = 0;

function playAudio(playNum) {
  audio.src = playList[playNum].src; // ссылка на аудио-файл;
  playList[playNum].src;
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  toggleBtn();
}

function toggleBtn() {
  if (!isPlay) {
    buttonPlay.classList.remove("pause");
  } else {
    buttonPlay.classList.add("pause");
  }
}

buttonPlay.addEventListener("click", () => playAudio(playNum));

// функции для пролистывания треков
function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else playNum += 1;
  isPlay = true;
  playAudio(playNum);
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else playNum -= 1;
  isPlay = true;
  playAudio(playNum);
}

buttonPlayNext.addEventListener("click", playNext);
buttonPlayPrev.addEventListener("click", playPrev);

playList.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = item.title;
  playListContainer.append(li);
});

console.log(playNum);
