import SearchBar from '../SearchBar'
import GridCell from '../GridCell';
import './styles.css';
import { useEffect, useState } from 'react';
import LocationCard from '../LocationCard';
import ForecastCard from '../ForecastCard';

import keys from '../../api-keys';
const getCurrentWeatherURL = (locationID) => `http://api.openweathermap.org/data/2.5/weather?id=${locationID}&units=metric&appid=${keys.weatherApi}`;

const getUrl = ({ coord }) => `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly&units=metric&appid=${keys.weatherApi}`;

const Home = () => {
    const [foundLocation, setFoundLocation] = useState(null);
    const [locationData, setLocationData] = useState({ current: null, forecast: null });
    const fetchWeatherData = (location) => {

        fetch(getCurrentWeatherURL(location.id))
            .then(response => response.json())
            .then(data => setLocationData(prevState => ({ ...prevState, current: data })))
            .catch(err => console.err(err));

        fetch(getUrl(location))
            .then(response => response.json())
            .then(data => setLocationData(prevState => ({ ...prevState, forecast: data })))
            .catch(err => console.err(err));
    }
    useEffect(() => {
        if (foundLocation) {
            fetchWeatherData(foundLocation);
        }

    }, [foundLocation])
    return (
        <div className="container-home">
            <GridCell row="1/2" col="1/8" >
                <SearchBar onSearch={setFoundLocation} />
            </GridCell>
            <GridCell row="2/4" col="1/4">
                {locationData.current && <LocationCard location={locationData.current} />}
            </GridCell>

            {locationData.forecast && locationData.forecast.daily.map((day, i) =>
                <GridCell row={i < 4 ? "2/3" : "3/4"} col={i < 4 ? `${i * 2 + 4}/${i * 2 + 6}` : `${i * 2 - 4}/${i * 2 - 2}`}>
                    <ForecastCard weatherData={day} />
                </GridCell>
            )}


        </div>
    );
}
export default Home;