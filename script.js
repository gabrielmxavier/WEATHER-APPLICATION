
function date() {
    var now = new Date();

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dates = [' ', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st', '32nd'];
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    month = now.getMonth();
    day = now.getDate();
    week = now.getDay();
    year = now.getFullYear();

    document.getElementById('days').innerHTML = weekDays[week] + ', ' + months[month] + ' ' + dates[day] + ''+ ', ' + year;
}

date();

const btnCity = document.getElementById('addcity');
btnCity.addEventListener('click', addCity);

let city = document.getElementById('typedCity');
let cityTyped = city;
let cityWeather = document.getElementById('cityname');

function addCity() {
    displayWeather(cityTyped.value);
}

    let temparatureDescription = document.getElementById('temperature');
    let tempIcon = document.getElementById('icons');
    let tempDescription = document.getElementById('desc');
    let sunSet = document.getElementById('sunset');
    let sunRise = document.getElementById('sunrise');

function displayWeather() {


            // BASED IN CITY NAME 
           // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={YOUR_API_KEY}

           // BASED IN GEOLOCATION
           // https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={YOUR_API_KEY}


    if (cityTyped.value != "") {
        let city = cityTyped.value;

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fce8385e482d828553de63bf9408e19b`;

        fetch(api)
        .then(result => result.json())
        .then(data => {

            console.log(data);

            const temperature = ((data.main.temp) - 273.15).toFixed(1);
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            let nameCity = data.name;
            let cityData = data.sys.country;

            let hourSunset = new Date(sunset * 1000).toLocaleTimeString();
            let hourSunrise = new Date(sunrise * 1000).toLocaleTimeString();

            temparatureDescription.innerText = `${temperature} ºC`;
            tempDescription.innerText = description;
            tempIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
            sunSet.innerText = `Sunset: ${hourSunset}`;
            sunRise.innerText = `Sunrise: ${hourSunrise}`;
            cityWeather.innerText = `${nameCity}, ${cityData}`;

        })

    } else {
        let lat;
        let long;

        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const apiGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fce8385e482d828553de63bf9408e19b`;

            fetch(apiGeo)
            .then(res => res.json())
            .then(data => {

                console.log(data);
                const temperature = ((data.main.temp) - 273.15).toFixed(1);
                const { description, icon } = data.weather[0];
                const { sunrise, sunset } = data.sys;
                let nameCity = data.name;
                let cityData = data.sys.country;

                let hourSunset = new Date(sunset * 1000).toLocaleTimeString();
                let hourSunrise = new Date(sunrise * 1000).toLocaleTimeString();

                temparatureDescription.innerText = `${temperature} ºC`;
                tempDescription.innerText = description;
                tempIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
                sunSet.innerText = `Sunset: ${hourSunset}`;
                sunRise.innerText = `Sunrise: ${hourSunrise}`;
                cityWeather.innerText = `${nameCity}, ${cityData}`;
            })
        })

    }

}

displayWeather();          


// Clock


const clock = document.getElementById('watch');

function clockHour() {
    
    let time = new Date();
    let hour = time.getHours().toString();
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();

    if (hour.length < 2) {
        hour = `0${hour}`;
    }

    if (minutes.length < 2) {
        minutes = `0${minutes}`;
    }

    if (seconds.length < 2) {
        seconds = `0${seconds}`;
    }

    let clockHourStr = `${hour} : ${minutes} . ${seconds}`;
    clock.textContent = clockHourStr;
}

setInterval(clockHour, 1000);
