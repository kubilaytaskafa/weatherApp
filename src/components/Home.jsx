import { FaWind } from "react-icons/fa";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import "../css/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });

  const getApi = async () => {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=Konya&appid=77ab7151917acd4d9deb89885bb8baed&units=metric";
    const response = await axios.get(apiUrl);
    setData({
      ...data,
      celcius: response.data.main.temp,
      name: response.data.name,
      humidity: response.data.main.humidity,
      speed: response.data.wind.speed,
    });
  };

  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" />
          <button className="search-btn">Search</button>
        </div>
        <div className="winfo">
          <IoPartlySunnyOutline className="winfo icon" />
          <h2>{data.celcius}°c</h2>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <WiHumidity className="humidity-icons" />
              <div className="humidity-desc">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <FaWind className="wind-icons" />
              <div className="wind-desc">
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
