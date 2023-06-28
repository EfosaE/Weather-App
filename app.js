const locationInput = document.querySelector('#search input');


const getWeather = async () => {

    const location = await getLocation() 

    console.log(location)

    let cityName = '' 
    let countryCode = ''

    if (locationInput.value !== '') {
        cityName = locationInput.value.split(',')[0]
        countryCode = locationInput.value.split(',')[1]
    }else {
        cityName = location.city 
        countryCode = location.countryCode
    }
  
  

    const geo = await getGeoData(cityName, countryCode)
    console.log(geo)


    const country = await getCountry(geo[0].country)
  
    const lat = geo[0].lat
    const lon = geo[0].lon
    const state = geo[0].state

    
    // weather related code
    const weather = await getWeatherData(lat, lon)
    const temp_c = `${weather.current.temp}` - 273; 
    const roundToTwo = (num) => {
        return Math.round(num * 100) / 100;
    }
    const icon = `${weather.current.weather[0].icon}`
   
    const displayWeather = () => {
        if (state.split(' ').includes(geo[0].name)){
            document.querySelector('#weather h2').innerHTML = `Weather in ${geo[0].name}, ${country.name}.`
        }else {
            document.querySelector('#weather h2').innerHTML = `Weather in ${geo[0].name}, ${state}, ${country.name}.`
        } 
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('#weather h3').innerHTML = `${roundToTwo(temp_c)}&#8451`
        document.querySelector('#weather img').src = ` http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector('#weather p').innerHTML = `${weather.current.weather[0].description}`
        document.querySelector('#weather #humidity').innerHTML = `Humidity: ${weather.current.humidity}`
        document.querySelector('#weather #pressure').innerHTML = `Pressure: ${weather.current.pressure}`
        document.querySelector('#weather #wind-speed').innerHTML = `Wind-speed: ${weather.current.wind_speed}m/s`
        document.querySelector('#weather').style.display = 'block';
    }

           displayWeather()
}

getWeather()

document.querySelector('#search i').addEventListener('click', () => {
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('#weather').style.display = 'none';
     if (locationInput.value === '') {
        document.querySelector('#weather').innerHTML = 'block'
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('#weather').style.display = 'Please enter a valid search parameter';
    }else {
        getWeather()
    }
})









