let navbarLink = document.querySelectorAll(".navbar-nav a");
let navContainer = document.querySelector(".navbar-nav");

navContainer.addEventListener("click", function (e) {
  for (let i = 0; i < navbarLink.length; i++) {
    navbarLink[i].classList.remove("active");
  }

  e.target.closest("a").classList.add("active");
});

///////////////////////////

var currDay = document.querySelector(".currDay");
var currDate = document.querySelector(".currDate");
var tomorrowDay = document.querySelector(".tomorrowDay");
var nextDay = document.querySelector(".nextDay");

let date = new Date();
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

currDay.textContent = dayNames[date.getDay()];
currDate.textContent = `${date.getDate()} ${monthNames[date.getMonth()]}`;
tomorrowDay.textContent = dayNames[date.getDay() + 1];
nextDay.textContent = dayNames[date.getDay() + 2];

let inputBtn = document.querySelector('.input-btn');
let searchInput = document.getElementById('searchInput');

searchInput.addEventListener("input", function(){
  getTemp(searchInput.value);
  console.log('tooo');
})

inputBtn.addEventListener("click", function(){
  getTemp(searchInput.value);
  console.log('tooo');
})


async function getTemp(inputValue) {
  var city = document.querySelector(".city");
  var currTemp = document.querySelector(".temprature");
  var currIcon = document.querySelector(".currIcon");
  var currStatus = document.querySelector(".status");
  var humidity = document.querySelector(".hum p");
  var wind = document.querySelector(".wind p");
  var windDirc = document.querySelector(".direction p");

  var tomorMinTemp = document.querySelector(".tomorMinTemp");
  var tomorrowIcon = document.querySelector(".tomorrowIcon");
  var tomorMaxTemp = document.querySelector(".tomorMaxTemp");
  var tomorrowStatus = document.querySelector(".tomorrowStatus");

  var nextMinTemp = document.querySelector(".nextMinTemp");
  var nextIcon = document.querySelector(".nextIcon");
  var nextMaxTemp = document.querySelector(".nextMaxTemp");
  var nextStatus = document.querySelector(".nextStatus");


  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=22c2a00d811249f78ed204124233012&q=${inputValue ? inputValue : "cairo"}&days=3`
  );
  const finalRes = await res.json();
  city.textContent = finalRes.location.name;
  currTemp.textContent = `${finalRes.current.temp_c}°C`;
  currIcon.src = finalRes.current.condition.icon;
  currStatus.textContent = finalRes.current.condition.text;
  humidity.textContent = `${finalRes.current.humidity}%`;
  wind.textContent = `${finalRes.current.wind_kph} Km/h`;
  windDirc.textContent = `${finalRes.current.wind_dir}`;

  tomorrowIcon.src = finalRes.forecast.forecastday[1].day.condition.icon;
  tomorMaxTemp.textContent = `${finalRes.forecast.forecastday[1].day.maxtemp_c}°C`;
  tomorMinTemp.textContent = `${finalRes.forecast.forecastday[1].day.mintemp_c}°C`;
  tomorrowStatus.textContent = finalRes.forecast.forecastday[1].day.condition.text;

  nextIcon.src = finalRes.forecast.forecastday[2].day.condition.icon;
  nextMaxTemp.textContent = `${finalRes.forecast.forecastday[2].day.maxtemp_c}°C`;
  nextMinTemp.textContent = `${finalRes.forecast.forecastday[2].day.mintemp_c}°C`;
  nextStatus.textContent = finalRes.forecast.forecastday[2].day.condition.text;
}
getTemp();
