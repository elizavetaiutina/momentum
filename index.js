const time = document.querySelector(".time");
const date = document.querySelector(".date");

function showDate() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-US", options);
  date.textContent = currentDate;
}

function showTime() {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}

showTime();
