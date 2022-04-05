const API_key = '32bc2f3a86b760a43ba67bc86901b93b'

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

// const outsideStatus = data.weather[0].main
// switch (outsideStatus) {
//     case 'Clear':
//         document.getElementByClass('background').src = './media/clear.jpg'
//     default:
//         document.getElementByClass('background').src = './media/default.jpg'
// }


const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        time: getHours(),
        date: getDate(),
        location: data.name,
        country: data.sys.country,
        temperature: data.main.temp + " °C",
        feels_like: "But they feel like " + data.main.feels_like + "°C",
        description: "Outside: " + data.weather[0].description,
        descriptionIcon: `
        <img alt="Weather icon" class="descriptionIcon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        ` ,
        humidity: "Humidity: " + data.main.humidity + " °C",
        humidityIcon: `
        <i class="fa-solid fa-water data_icons"></i>
        `,
        pressureIcon: `
        <i class="fa-solid fa-temperature-half data_icons"></i>
        `,
        pressure: "Pressure: " + data.main.pressure + " Ps",
    }

    Object.keys(weatherData).forEach(key => {

        document.getElementById(key).innerHTML = weatherData[key];
    });
}

const getDate = () => {
    let date = new Date();
    const monthNameShort = date.toLocaleString("en-US", { month: "short" });
    return `${date.getDate()} ${monthNameShort.toUpperCase()} ${date.getFullYear()}`;
}

const getHours = () => {
    let time = new Date();
    const hours = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${hours}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}