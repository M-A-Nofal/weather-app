const apiKey = `94703722d734606846ef3b1e95670d4a`;

const urlIcon = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherData = async (city, units = 'metric') => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    const data = await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => data);

        const {
            weather,
            main: {feels_like, humidity, pressure, temp, temp_max, temp_min},
            wind: {speed},
            sys: {country},
            name,
        } = data;

        const {description, icon} = weather[0];

        return {
            description,
            iconUrl: urlIcon(icon),
            feels_like,
            humidity,
            pressure,
            temp,
            temp_max,
            temp_min,
            speed,
            country,
            name
        };
};

export {getWeatherData};