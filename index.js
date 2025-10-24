const valueSearch = document.getElementById('value-search')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const description = document.querySelector('.description')
const clouds = document.getElementById('clouds')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const form = document.querySelector('form')
const main = document.querySelector('main')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(valueSearch.value !== ''){
        searchWeather();
    }
})

const API_KEY = '26b9f9391c29b6946fa90a66f4067a56'
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + API_KEY;

const searchWeather = () => {
  fetch(url + '&q=' + valueSearch.value)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        city.querySelector('.caption').textContent = data.name
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
        temperature.querySelector('.caption span').textContent = data.main.temp
        description.textContent = data.weather[0].description
        clouds.textContent = data.clouds.all
        humidity.textContent = data.main.humidity
        pressure.textContent = data.main.pressure
      } else {
        main.classList.add('error')
        setTimeout(() => {
          main.classList.remove('error')
        }, 1000)
      }
      valueSearch.value = ''
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

// Search Default
const weatherApp = () => {
  valueSearch.value = 'Yaounde'
  searchWeather()
}

weatherApp()