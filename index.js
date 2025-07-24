let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');


form.addEventListener('submit',(e) => {
    e.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
})

let API_KEY = '26b9f9391c29b6946fa90a66f4067a56'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + API_KEY;

const searchWeather  = () => {

    fetch(url+'&q='+ valueSearch.value)
        .then(res => res.json())
        .then(data => {
            if (data.cod == 200) {
                city.querySelector('.caption').innerText = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('.caption span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;
                
                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(()=> {
                    main.classList.remove('error')
                }, 1000); 
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

// search Default
const weatherApp = () => {
    valueSearch.value = 'Yaounde';
    searchWeather();
}
weatherApp();