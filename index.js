const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

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

// Приветствие
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

// Local storage name input
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
console.log(city);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    "moscow" || city.value
  }&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
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

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);

/*---------------- TASK 3:  Слайдер изображений ----------------*/

//возвращающую рандомное число от 1 до 20 включительно
function getRandomNum() {
  return Math.ceil(Math.random() * (20 - 1) + 1);
}
let randomNum = getRandomNum();

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

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
