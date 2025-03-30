/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/apiKeyAndHost.js":
/*!**********************************!*\
  !*** ./src/api/apiKeyAndHost.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiKey: () => (/* binding */ apiKey),
/* harmony export */   baseUrl: () => (/* binding */ baseUrl)
/* harmony export */ });
const apiKey = "911f4065b276e311e5f7b0f69ebcca50"

const baseUrl = "https://api.openweathermap.org"

/***/ }),

/***/ "./src/api/geoData.js":
/*!****************************!*\
  !*** ./src/api/geoData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGeoData: () => (/* binding */ getGeoData)
/* harmony export */ });
/* harmony import */ var _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");
/* harmony import */ var _components_inputForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/inputForm.js */ "./src/components/inputForm.js");
/* harmony import */ var _components_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/error.js */ "./src/components/error.js");
/* harmony import */ var _helpers_checkCyrillic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/checkCyrillic.js */ "./src/helpers/checkCyrillic.js");
/* harmony import */ var _helpers_cityAbbreviation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/cityAbbreviation.js */ "./src/helpers/cityAbbreviation.js");
/* harmony import */ var _helpers_saveCityToLocalStorage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/saveCityToLocalStorage.js */ "./src/helpers/saveCityToLocalStorage.js");
/* harmony import */ var _getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWeatherAndForecast.js */ "./src/api/getWeatherAndForecast.js");
/* harmony import */ var _components_currentWeather_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/currentWeather.js */ "./src/components/currentWeather.js");
/* harmony import */ var _components_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/hourlyForecast.js */ "./src/components/hourlyForecast.js");
/* harmony import */ var _components_dailyForecast_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/dailyForecast.js */ "./src/components/dailyForecast.js");











const getGeoData = async () => {
  let city = _components_inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput.value.trim();

  if (!city) {
    return;
  }

  if (!(0,_helpers_checkCyrillic_js__WEBPACK_IMPORTED_MODULE_3__.isCyrillic)(city)) {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Проверьте название города!");
    return;
  }

  city = (0,_helpers_cityAbbreviation_js__WEBPACK_IMPORTED_MODULE_4__.replaceAbbreviation)(city);

  try {
    const geoUrl = `${_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: city,
      limit: 1,
      appid: _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
    });

    const geoResponse = await fetch(`${geoUrl}?${queryParams.toString()}`);

    const geoData = await geoResponse.json();

    if (!geoData.length) {
      throw new Error("Город не найден");
    }

    const { lat, lon } = geoData[0];
    (0,_helpers_saveCityToLocalStorage_js__WEBPACK_IMPORTED_MODULE_5__.saveCityToLocalStorage)(city);

    const weatherData = await (0,_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__.getWeather)(lat, lon);
    console.log(weatherData)
    const forecastData = await (0,_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__.getForecast)(lat, lon);


    (0,_components_currentWeather_js__WEBPACK_IMPORTED_MODULE_7__.renderCurrentWeather)(weatherData, city);
    (0,_components_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_8__.renderHourlyForecast)(forecastData);
    (0,_components_dailyForecast_js__WEBPACK_IMPORTED_MODULE_9__.renderDailyForecast)(forecastData);
  } catch (error) {
    console.error(error.message);
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Данные не получены");
  }
};


/***/ }),

/***/ "./src/api/getWeatherAndForecast.js":
/*!******************************************!*\
  !*** ./src/api/getWeatherAndForecast.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getForecast: () => (/* binding */ getForecast),
/* harmony export */   getWeather: () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");


const fetchData = async (endpoint, lat, lon) => {
    const url = new URL(`${_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/data/2.5/${endpoint}`)

    const queryParams = new URLSearchParams({
        lat,
        lon,
        appid: _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
        lang: 'ru',
        units: 'metric'
    })

    url.search = queryParams.toString()

    const response = await fetch(url)

    if(!response.ok) {
        throw new Error("Не удалось загрузить данные о погоде")
    }

    return response.json()
}

const getWeather = async (lat, lon) => {
    return fetchData('weather', lat, lon)
}

const getForecast = async (lat, lon) => {
    return fetchData('forecast', lat, lon)
}



/***/ }),

/***/ "./src/components/currentWeather.js":
/*!******************************************!*\
  !*** ./src/components/currentWeather.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCurrentWeather: () => (/* binding */ renderCurrentWeather)
/* harmony export */ });
/* harmony import */ var _helpers_windParam_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/windParam.js */ "./src/helpers/windParam.js");
/* harmony import */ var _helpers_humidityParam_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/humidityParam.js */ "./src/helpers/humidityParam.js");
/* harmony import */ var _helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formatTime.js */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_calcDayLength_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/calcDayLength.js */ "./src/helpers/calcDayLength.js");
/* harmony import */ var _helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/calcSunPosition.js */ "./src/helpers/calcSunPosition.js");







const currentCity = document.querySelector(".city");
const currentTemp = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels");
const currentDescription = document.querySelector(".description");
const currentWeatherIcon = document.querySelector(".weather-icon img");
const currentWind = document.querySelector(".wind");
const currentVisibility = document.querySelector(".visibility");
const currentHumidity = document.querySelector(".humidity");
const currentPressure = document.querySelector(".pressure");
const sunriseItem = document.querySelector(".sunrise");
const sunsetItem = document.querySelector(".sunset");
const dayLength = document.querySelector(".day-length");

const renderCurrentWeather = (data, city) => {
  currentCity.textContent = city || "Неизвестно";
  currentTemp.textContent = `${Math.round(data.main?.temp || 0)}°С`;
  feelsLike.textContent = `${Math.round(data.main?.feels_like || 0)}°С`;
  currentDescription.textContent =
    data.weather?.[0]?.description || "Неизвестно";
  currentWeatherIcon.src = `https://openweathermap.org/img/wn/${
    data.weather?.[0]?.icon || "01d"
  }@2x.png`;

  currentWind.textContent = `${Math.round(data.wind?.speed || 0)} м/с`;

  const visibility = data.visibility || 0;
  if (visibility > 1000) {
    currentVisibility.textContent = `${(visibility / 1000).toFixed(1)} км`;
  } else {
    currentVisibility.textContent = `${visibility} м`;
  }

  currentHumidity.textContent = `${data.main?.humidity || 0}%`;
  currentPressure.textContent = `${Math.round(
    (data.main?.pressure || 0) * 0.750062
  )} мм рт.ст.`;

  const windDegrees = data.wind?.deg || 0;
  (0,_helpers_windParam_js__WEBPACK_IMPORTED_MODULE_0__.updateWindDirection)(windDegrees);

  const humidity = data.main?.humidity || 0;
  (0,_helpers_humidityParam_js__WEBPACK_IMPORTED_MODULE_1__.updateHumidityScale)(humidity);

  const { sunrise, sunset } = data.sys || {};
  const { timezone } = data || {};

  sunriseItem.textContent = sunrise
    ? (0,_helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__.formatTime)(sunrise, timezone)
    : "Неизвестно";
  sunsetItem.textContent = sunset ? (0,_helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__.formatTime)(sunset, timezone) : "Неизвестно";

  dayLength.textContent = `Долгота дня: ${
    sunrise && sunset ? (0,_helpers_calcDayLength_js__WEBPACK_IMPORTED_MODULE_3__.calcDayLength)(sunrise, sunset) : "Неизвестно"
  }`;

  const sunPosition = sunrise && sunset ? (0,_helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__.calcSunPosition)(sunrise, sunset) : 0;
  (0,_helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__.updateSunPosition)(sunPosition)
};


/***/ }),

/***/ "./src/components/dailyForecast.js":
/*!*****************************************!*\
  !*** ./src/components/dailyForecast.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderDailyForecast: () => (/* binding */ renderDailyForecast)
/* harmony export */ });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.js */ "./src/components/error.js");
const dailyForecast = document.querySelector(".forecast-list");


const renderDailyForecast = (data) => {
  dailyForecast.innerHTML = "";

  if (!data) {
    (0,_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Данные о погоде недоступны");
  }

  const groupedData = groupDataByDay(data.list);
  Object.keys(groupedData)
    .slice(0, 5)
    .forEach((dayKey) => {
      const dayData = groupedData[dayKey];
     

      const maxTemp = Math.round(
        Math.max(...dayData.map((item) => item.main.temp_max))
      );

      const minTemp = Math.round(
        Math.min(...dayData.map((item) => item.main.temp_min))
      );
      
      let icon = dayData[0].weather[0].icon;
      icon = icon.slice(0,-1) + "d"
     

      const date = new Date(dayData[0].dt * 1000);
      const dayName = date.toLocaleDateString("ru-Ru", {
        weekday: "short",
      });

      const dayAndMonthName = date.toLocaleDateString("ru-Ru", {
        day: "numeric",
        month: "short",
      });

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      forecastItem.innerHTML = `
          <p class="day">${dayName},</p>
          <p class="day">${dayAndMonthName}</p>
          <img
            src="https://openweathermap.org/img/wn/${icon}@4x.png"
            alt="Погода"
          />
          <div class="temp">
            <p class="temp-day">${maxTemp}°C</p>
            <p class="temp-night">${minTemp}°C</p>
          </div>
      `;
      dailyForecast.append(forecastItem);
    });
};

const groupDataByDay = (list) => {
  const groupedData = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("ru-Ru");

    if (!groupedData[dayKey]) {
      groupedData[dayKey] = [];
    }

    groupedData[dayKey].push(item);
  });
  return groupedData;
};


/***/ }),

/***/ "./src/components/error.js":
/*!*********************************!*\
  !*** ./src/components/error.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
}


/***/ }),

/***/ "./src/components/geoLocation.js":
/*!***************************************!*\
  !*** ./src/components/geoLocation.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   geoLocation: () => (/* binding */ geoLocation)
/* harmony export */ });
/* harmony import */ var _api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.js */ "./src/components/error.js");
/* harmony import */ var _api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/getWeatherAndForecast.js */ "./src/api/getWeatherAndForecast.js");
/* harmony import */ var _currentWeather_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentWeather.js */ "./src/components/currentWeather.js");
/* harmony import */ var _hourlyForecast_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hourlyForecast.js */ "./src/components/hourlyForecast.js");
/* harmony import */ var _dailyForecast_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dailyForecast.js */ "./src/components/dailyForecast.js");







function geoLocation() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const { latitude, longitude } = await getBrowserGeolocation();

      const locationName = await geoLocationName(latitude, longitude);
      await fetchWeatherByCoords(latitude, longitude, locationName)
    } catch {
        console.error("Ошибка при получении геолокации:", error.message)
        ;(0,_error_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Не удалось определить Ваше местоположение. Пожалуйста, введите город вручную.")
    }
  });
}

const getBrowserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается Вашим браузером"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

const geoLocationName = async (latitude, longitude) => {
  const reversedGeocodingUrl = new URL(`${_api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/geo/1.0/reverse `);

  const queryParams = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    limit: 1,
    appid: _api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
  });

  reversedGeocodingUrl.search = queryParams.toString();

  try {
    const response = await fetch(reversedGeocodingUrl);
    const data = await response.json();

    if (data && data.length > 0) {
      const { local_names } = data[0];
      const russianName = local_names?.ru || data[0].name;
      return `${russianName}`;
    } else {
      throw new Error("Название места не найдено");
    }
  } catch (error) {
    console.error("Ошибка при получении названия места", error.message);
    (0,_error_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Ошибка при получении названия места");
  }
};

const fetchWeatherByCoords = async (latitude, longitude, locationName) => {
  try {
    const weatherData = await (0,_api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_2__.getWeather)(latitude, longitude);
    const forecastData = await (0,_api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_2__.getForecast)(latitude, longitude);

    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_3__.renderCurrentWeather)(weatherData, locationName);
    (0,_dailyForecast_js__WEBPACK_IMPORTED_MODULE_5__.renderDailyForecast)(forecastData);
    (0,_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_4__.renderHourlyForecast)(forecastData);
  } catch (error) {
    console.error(error.message);
    (0,_error_js__WEBPACK_IMPORTED_MODULE_1__.showError)(
      "Не удалось получить данные о погоде. Пожалуйста, попробуйте позже"
    );
  }
};


/***/ }),

/***/ "./src/components/hourlyForecast.js":
/*!******************************************!*\
  !*** ./src/components/hourlyForecast.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHourlyForecast: () => (/* binding */ renderHourlyForecast)
/* harmony export */ });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.js */ "./src/components/error.js");
const hourlyForecast = document.querySelector(".hourly-scroll");


const renderHourlyForecast = (data) => {
  hourlyForecast.innerHTML = "";

  if (!data) {
    (0,_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Данные о погоде недоступны");
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const timezoneOffset = data.city.timezone * 1000

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000 + timezoneOffset);
    const hour = date.getHours();
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    const forecastDate = new Date(date);
    forecastDate.setHours(0, 0, 0, 0);

    const timeDiff = forecastDate.getTime() - currentDate.getTime();

    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let dayLabel;

    if (dayDiff === 0) {
      dayLabel = "Сегодня";
    } else if (dayDiff === 1) {
      dayLabel = "Завтра";
    } else {
      dayLabel = daysOfWeek[forecastDate.getDay()];
    }

    const hourlyItem = document.createElement("div");
    hourlyItem.classList.add("hourly-item");
    hourlyItem.innerHTML = `
      <p class="hour">${dayLabel}</p>
  <p class="hour">${hour}:00</p>
  <img
    src="https://openweathermap.org/img/wn/${icon}@4x.png"
    alt="Погода"
  />
  <p class="temp">${temp}°C</p>
      `;

    hourlyForecast.append(hourlyItem);
  });
};


/***/ }),

/***/ "./src/components/inputForm.js":
/*!*************************************!*\
  !*** ./src/components/inputForm.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cityInput: () => (/* binding */ cityInput),
/* harmony export */   getWeatherByForm: () => (/* binding */ getWeatherByForm)
/* harmony export */ });
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _showRecentCities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./showRecentCities.js */ "./src/components/showRecentCities.js");



const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector(".city-input");

function getWeatherByForm() {
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_0__.getGeoData)(cityInput);
  });

  cityInput.addEventListener('focus', () => {
    (0,_showRecentCities_js__WEBPACK_IMPORTED_MODULE_1__.showRecentCities)()
  })
}




/***/ }),

/***/ "./src/components/scrollToTop.js":
/*!***************************************!*\
  !*** ./src/components/scrollToTop.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrollToTop: () => (/* binding */ scrollToTop)
/* harmony export */ });
const scrollToTopBtn = document.getElementById("toTop");
scrollToTopBtn.style.display = "none";

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});


/***/ }),

/***/ "./src/components/showRecentCities.js":
/*!********************************************!*\
  !*** ./src/components/showRecentCities.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showRecentCities: () => (/* binding */ showRecentCities)
/* harmony export */ });
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _inputForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputForm.js */ "./src/components/inputForm.js");



const recentCitiesList = document.getElementById("recent-cities-list");

document.addEventListener("click", (e) => {
  if (e.target !== _inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput && e.target !== recentCitiesList) {
    recentCitiesList.style.display = "none";
  }
});

const showRecentCities = () => {
  const cities = JSON.parse(localStorage.getItem("recentCities")) || [];

  if (cities.length === 0) return;

  recentCitiesList.innerHTML = "";

  cities.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      _inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput.value = city;
      (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_0__.getGeoData)(city)
      recentCitiesList.style.display = "none";
    });
    recentCitiesList.append(li);
  });

  recentCitiesList.style.display = "block";
};


/***/ }),

/***/ "./src/components/showYearInFooter.js":
/*!********************************************!*\
  !*** ./src/components/showYearInFooter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showFooterYear: () => (/* binding */ showFooterYear)
/* harmony export */ });
function showFooterYear() {
    const footerYearElement = document.getElementById('currentYear');

    const now = new Date();
    const yearNow = now.getFullYear();
    footerYearElement.textContent = `© ${yearNow}`
}

/***/ }),

/***/ "./src/components/switchTheme.js":
/*!***************************************!*\
  !*** ./src/components/switchTheme.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchTheme: () => (/* binding */ switchTheme)
/* harmony export */ });
function switchTheme() {
  const themeSwitch = document.getElementById("themeSwitch");
  let userHasChosenTheme = false;

  themeSwitch.addEventListener("change", toggleTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    let newTheme;
    if (currentTheme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    userHasChosenTheme = true;

    setTheme(newTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (userHasChosenTheme) {
      localStorage.setItem("theme", theme);
    }
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const themeByBrowser = getThemeByBrowserSettings();
    if (themeByBrowser === "dark") {
      setTheme("dark");
    } else {
      const themeByTime = getThemeByTime();
      setTheme(themeByTime);
    }
  }

  function getThemeByTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 7 && hours < 22 ? "light" : "dark";
  }

  function getThemeByBrowserSettings() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  }
}


/***/ }),

/***/ "./src/helpers/calcDayLength.js":
/*!**************************************!*\
  !*** ./src/helpers/calcDayLength.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcDayLength: () => (/* binding */ calcDayLength)
/* harmony export */ });
function calcDayLength(sunrise, sunset) {
    const diffInSeconds = sunset - sunrise;
    const hours = Math.floor(diffInSeconds / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    return `${hours} час ${minutes} мин`
}

/***/ }),

/***/ "./src/helpers/calcSunPosition.js":
/*!****************************************!*\
  !*** ./src/helpers/calcSunPosition.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcSunPosition: () => (/* binding */ calcSunPosition),
/* harmony export */   updateSunPosition: () => (/* binding */ updateSunPosition)
/* harmony export */ });
const calcSunPosition = (sunrise, sunset) => {
  const now = Math.floor(Date.now() / 1000);
  const totalDayLength = sunset - sunrise;
  const elapsedTime = now - sunrise;

  const percentage = elapsedTime / totalDayLength;
  return percentage;
};

const updateSunPosition = (sunPosition) => {
  const sun = document.querySelector(".sun-graphic circle");
  if (sunPosition < 0 || sunPosition > 1) {
    sun.setAttribute("visibility", "hidden");
    return;
  }

  sun.setAttribute("visibility", "visible");

  const startX = 20;
  const endX = 180;
  const horizonY = 35;
  const arcRadius = 45;

  const x = startX + sunPosition * (endX - startX);
  const y = horizonY - Math.sin(sunPosition * Math.PI) * arcRadius;

  sun.setAttribute("cx", x);
  sun.setAttribute("cy", y);
};


/***/ }),

/***/ "./src/helpers/capitalize.js":
/*!***********************************!*\
  !*** ./src/helpers/capitalize.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalizeCity: () => (/* binding */ capitalizeCity)
/* harmony export */ });
const capitalizeCity = (city) => {
  if (!city) return city;

  const citiesWithHyphens = [
    "Комсомольск-на-Амуре",
    "Ростов-на-Дону",
    "Cанкт-Петербург",
  ];

  if (citiesWithHyphens.includes(city)) {
    return city
      .toLowerCase()
      .split(/[\s-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
  }

  return city
    .toLowerCase()
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


/***/ }),

/***/ "./src/helpers/checkCyrillic.js":
/*!**************************************!*\
  !*** ./src/helpers/checkCyrillic.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isCyrillic: () => (/* binding */ isCyrillic)
/* harmony export */ });
/* harmony import */ var _components_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/error.js */ "./src/components/error.js");


const cityInput = document.querySelector(".city-input");

const isCyrillic = (text) => {
  const cyrillicPattern = /^[А-Яа-яЁё\s-]+$/;
  return cyrillicPattern.test(text);
};

cityInput.addEventListener("input", () => {
  const inputValue = cityInput.value.trim();

  if (inputValue && !isCyrillic(inputValue)) {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Введите на кириллице");
  } else {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("");
  }
});


/***/ }),

/***/ "./src/helpers/cityAbbreviation.js":
/*!*****************************************!*\
  !*** ./src/helpers/cityAbbreviation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   replaceAbbreviation: () => (/* binding */ replaceAbbreviation)
/* harmony export */ });
const replaceAbbreviation = (city) => {
  const lowerCaseCity = city.toLowerCase();

  if (cityAbbreviations[lowerCaseCity]) {
    return cityAbbreviations[lowerCaseCity];
  }

  return city;
};

const cityAbbreviations = {
  мск: "Москва",
  нск: "Новосибирск",
  спб: "Санкт-Петербург",
};


/***/ }),

/***/ "./src/helpers/currentTime.js":
/*!************************************!*\
  !*** ./src/helpers/currentTime.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   renderCurrentTime: () => (/* binding */ renderCurrentTime)
/* harmony export */ });
const formatDate = (date) => {
  const datePart = date.toLocaleDateString("ru", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const timePart = date.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart}, ${timePart}`;
};

const renderCurrentTime = () => {
  const nowElement = document.querySelector(".now");
  const currentTime = new Date();

  const formattedTime = formatDate(currentTime);
  nowElement.textContent = `Сейчас: ${formattedTime}`;
};

setInterval(renderCurrentTime, 60000);


/***/ }),

/***/ "./src/helpers/formatTime.js":
/*!***********************************!*\
  !*** ./src/helpers/formatTime.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTime: () => (/* binding */ formatTime)
/* harmony export */ });
const formatTime = (unixTime, timezone) => {
    const localTime = unixTime + timezone;

    const date = new Date(localTime * 1000)

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
}

/***/ }),

/***/ "./src/helpers/humidityParam.js":
/*!**************************************!*\
  !*** ./src/helpers/humidityParam.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateHumidityScale: () => (/* binding */ updateHumidityScale)
/* harmony export */ });
const updateHumidityScale = (humidity) => {
    const parameter = document.querySelector('.parameter');
    parameter.style.width = `${humidity}%`
}

/***/ }),

/***/ "./src/helpers/saveCityToLocalStorage.js":
/*!***********************************************!*\
  !*** ./src/helpers/saveCityToLocalStorage.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   saveCityToLocalStorage: () => (/* binding */ saveCityToLocalStorage)
/* harmony export */ });
/* harmony import */ var _capitalize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize.js */ "./src/helpers/capitalize.js");


const saveCityToLocalStorage = (city) => {
  const capitalizedCity = (0,_capitalize_js__WEBPACK_IMPORTED_MODULE_0__.capitalizeCity)(city);
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!cities.includes(capitalizedCity)) {
    cities.unshift(capitalizedCity);
    if (cities.length > 5) {
      cities.pop();
    }
    localStorage.setItem("recentCities", JSON.stringify(cities));
  }
};


/***/ }),

/***/ "./src/helpers/windParam.js":
/*!**********************************!*\
  !*** ./src/helpers/windParam.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateWindDirection: () => (/* binding */ updateWindDirection)
/* harmony export */ });
function updateWindDirection(windDeg) {
    const windIcon = document.getElementById('wind-direction-icon');
    const windText = document.getElementById('wind-direction-text');

    const iconRotation = (windDeg + 180) % 360; 
    windIcon.style.transform = `rotate(${iconRotation}deg)`;

    const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"]
    const normalizedDegrees = (windDeg + 360) % 360;
    const index = Math.round(normalizedDegrees / 45) % 8;
    windText.textContent = directions[index] || "Н/Д"
    
}

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initApp: () => (/* binding */ initApp)
/* harmony export */ });
/* harmony import */ var _components_switchTheme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/switchTheme.js */ "./src/components/switchTheme.js");
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _components_inputForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/inputForm.js */ "./src/components/inputForm.js");
/* harmony import */ var _helpers_currentTime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/currentTime.js */ "./src/helpers/currentTime.js");
/* harmony import */ var _components_geoLocation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/geoLocation.js */ "./src/components/geoLocation.js");
/* harmony import */ var _components_scrollToTop_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/scrollToTop.js */ "./src/components/scrollToTop.js");
/* harmony import */ var _components_showYearInFooter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/showYearInFooter.js */ "./src/components/showYearInFooter.js");








function initApp() {
  (0,_components_switchTheme_js__WEBPACK_IMPORTED_MODULE_0__.switchTheme)();
  (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_1__.getGeoData)();
  (0,_components_inputForm_js__WEBPACK_IMPORTED_MODULE_2__.getWeatherByForm)();
  (0,_helpers_currentTime_js__WEBPACK_IMPORTED_MODULE_3__.renderCurrentTime)();
  (0,_components_geoLocation_js__WEBPACK_IMPORTED_MODULE_4__.geoLocation)();
  (0,_components_scrollToTop_js__WEBPACK_IMPORTED_MODULE_5__.scrollToTop)();
  (0,_components_showYearInFooter_js__WEBPACK_IMPORTED_MODULE_6__.showFooterYear)();
}


/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init.js */ "./src/init.js");




(0,_init_js__WEBPACK_IMPORTED_MODULE_1__.initApp)()
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map