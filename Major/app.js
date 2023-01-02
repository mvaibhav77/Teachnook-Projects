// API Call
async function getCurrWeather(loc){
    const res = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=7b0e0199d430c5faab78f576fb79fdd4`);
    const response = (await res).json();
    return response;
}

async function getWeekWeather(loc){
    const res = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=5b0efc82afef16b9891f2f8e61b5c757`);
    const response = (await res).json();
    
document.querySelector('#nextDays').addEventListener('click', (e)=>{
    nextSevenDays.style.display = 'block';
    currWeather.style.display = 'none';
console.log(0)
    e.preventDefault();
})

    return response;
}

function callWeekWeather(city){
    getWeekWeather(city).then((res)=>{
        useWeekWeather(res.list);
        // console.log(res.list);
        
    })
}
function callCurrWeather(city){
    getCurrWeather(city).then((res)=>{
        useCurrWeather(res);
        console.log(res);

    })
}

// Get next seven days UI
document.addEventListener('DOMContentLoaded',()=>{
    nextSevenDays.style.display = 'none';
callCurrWeather('new delhi');

    callWeekWeather('new delhi');

})


// UI Elements
const back = document.getElementById('back');
const currWeather = document.querySelector('.currWeather');
const nextSevenDays = document.querySelector('.nextSevenDays');
const weekly = document.querySelector('.weekly');
const currMain = document.querySelector('.currMain');
const search = document.getElementById('search');
const city = document.getElementById('city');


// search weather
search.addEventListener('click', (e)=>{
    const cityName = city.value;
    callCurrWeather(cityName);
    callWeekWeather(cityName);

    e.preventDefault();
})



document.querySelector('#nextDays').addEventListener('click', (e)=>{
    nextSevenDays.style.display = 'block';
    currWeather.style.display = 'none';
console.log(0)
    e.preventDefault();
})

back.addEventListener('click', (e)=>{
    nextSevenDays.style.display = 'none';
    currWeather.style.display = 'block';

    e.preventDefault();
})

// UI Adjustment
function K2C(k){
    return Math.round(k-273);
}
function D2Day(d){
    return (new Date(d)).getDay()
}
function viewDate(dt){
    return String(new Date(dt*1000)).slice(0,15);
}
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function useCurrWeather(data){
    const output=`
        <div class="visual mt-2 col-6 text-center">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" srcset="">
        </div>
        <div class="temp mt-2 col-6 text-center">${K2C(data.main.temp)}&#8451</div>
        <div class="params col-6 px-5">
            <span class="weather">${data.weather[0].main}</span> <br>
            <span class="humidity">Humidity : ${data.main.humidity}%</span> <br>
            <span class="wind">Wind: ${data.wind.speed} m/s</span> <br>
        </div>
        <div class="col-6 text-center">
            <div class="location">${data.name}, ${data.sys.country}</div>
            <div class="date">${viewDate(data.dt)}</div>
            <button class="btn btn-dark mt-3" id="nextDays">Next 7 Days</button>
            
        </div>
    `;

    currMain.innerHTML = output;
}

function useWeekWeather(data){
    let output = '';
    const startDay = new Date(data[0].dt_txt).getHours();
    const today = (new Date()).getHours();
    let j = (24-startDay)/3;
    let k = Math.round((24-today)/3);
    for(let i=j+k;i<data.length;i=i+8){
        output+=`
            <div class="px-3 mt-2">
                <div class="day text-center">${weekday[D2Day(data[i].dt_txt)]}</div>
                <img src="http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png" class="img" height="90" width="90" alt="" srcset="">
                <div class="temp text-center">
                    <span class="temp">${K2C(data[i].main.temp_max)}&#8451</span>
                </div>
            </div>
        `
    }
    weekly.innerHTML = output;
}




