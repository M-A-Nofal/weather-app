import './App.css';
import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import Descs from './components/Descs';
import { useEffect, useState } from 'react';
import { getWeatherData } from './weatherServices';


function App() {

  const [city, setCity] = useState('Cairo');
  const [weather, setWeather] = useState(null);
  const [units, setUntis] = useState('metric');
  const [bg, setBg] = useState(hotBg);

  useEffect (() => {
    // fetch data
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units)
      setWeather(data);

      //dynamc bg
      const threshold = units === 'metric' ? 21 : 100 ;
      if (data.temp <= threshold) {
        setBg (coldBg)
      } else {
        setBg(hotBg)
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnit = (e) => {
    const btn = e.currentTarget;
    const currentUnit = btn.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    btn.innerText = isCelsius ? "°F" : "°C";
    setUntis(isCelsius ? 'metric' : 'imperial')
  }

  const enterCity = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" style={{background: `url(${bg})`}}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
            <div className='section sectionInputs'>
              <input onKeyDown={enterCity} type='text' name='city' placeholder='Enter City..' />
              <button onClick={(e)=> handleUnit(e)}>°C</button>
            </div>
            <div className='section sectionTemp'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt='weather icon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temp'>
                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            {/* bottom desc */}
            <Descs weather={weather} units={units}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
