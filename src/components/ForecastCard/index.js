import moment from 'moment';
import './styles.css';
const iconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

const ForecastCard = ({ weatherData }) => {
    const { dt, temp, weather } = weatherData;
    console.log(weatherData)
    return (
        <div className="card-container">
            <h3>{moment.unix(dt).format("DD MMM YYYY")}</h3>
            <div className="card-info">
                <img className="weather-icon" alt={weather[0].description} src={iconUrl(weather[0].icon)} />
                <h4>
                    {temp.max}°C <br />
                    {temp.min}°C

                </h4>

            </div>
        </div>
    )
}
export default ForecastCard;