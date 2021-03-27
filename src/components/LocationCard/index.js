import './styles.css';

const iconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`
const LocationCard = ({ location }) => {
    const { name, main, weather, wind } = location;
    return (
        <div className="card-container">
            <h1>{name}</h1>
            <div className="card-info">
                <img className="weather-icon" alt={weather[0].description} src={iconUrl(weather[0].icon)} />
                <div>
                    <h2> {main.temp} °C</h2>
                    <h4> Max: {main.temp_max} °C <br /> Min: {main.temp_min} °C</h4>
                </div>

            </div>
            <div>
                <h4>
                        Feels like: {main.feels_like}<br />
                        Humidity: {main.humidity}%<br />
                        Wind Speed: {wind.speed} m/s<br />
                </h4>
            </div>
        </div>
    )
}
export default LocationCard;