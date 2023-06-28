const getLocation = async () => {
    const response = await fetch('http://ip-api.com/json/')

    if (response.status === 200) {
        const locationData = await response.json()
        return locationData
    } else {
        throw new Error ('Unable to fetch data')
    }
}

const APIkey = '2a4a9879c018b88f59e675b1859b3755'

// Geo is the latitude and longitude co-ordinates.

const getGeoData = async (cityName, countryCode) => {
    const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${APIkey}`)
    
    if (geoResponse.status === 200) {
        const geoData = await geoResponse.json()
        return geoData
    } else {
        throw new Error ('Unable to get data')
    }
}

const getCountry = async (countryCode) => {
    const response = await fetch('https://restcountries.com/v2/all')
    if (response.status === 200) {
        const allCountries = await response.json()
        return allCountries.find((country) => country.alpha2Code === countryCode)
    } else {
        throw new Error (`Unable to fetch data`)
    }
}


const getWeatherData = async (lat, lon) => {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    
    if (weatherResponse.status === 200) {
        const weatherData = await weatherResponse.json()
        return weatherData
    }else {
        throw new Error ('Unable to get data')
    }
}