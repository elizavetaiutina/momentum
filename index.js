const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

// Приветствие
function showGreeting() {
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
  console.log(name);
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  console.log(name);
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);
