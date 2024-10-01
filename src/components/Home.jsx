import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import "../css/style.css";
import { useState } from "react";
import axios from "axios";
import cloudImage from "../images/cloud.png";
import clearSkyImage from "../images/clear-sky.png";
import rainyImage from "../images/rainy.png";
import smogImage from "../images/smog.png";
import rainImage from "../images/rain.png";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: cloudImage,
  });

  const [name, setName] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=77ab7151917acd4d9deb89885bb8baed&units=metric`;
      const getApi = async () => {
        const response = await axios.get(apiUrl);
        let imagePath;
        if (response.data.weather[0].main === "Clouds") {
          imagePath = cloudImage;
        } else if (response.data.weather[0].main === "Clear") {
          imagePath = clearSkyImage;
        } else if (response.data.weather[0].main === "Rain") {
          imagePath = rainyImage;
        } else if (response.data.weather[0].main === "Mist") {
          imagePath = smogImage;
        } else if (response.data.weather[0].main === "Drizzle") {
          imagePath = rainImage;
        } else {
          imagePath = cloudImage;
        }
        setData({
          ...data,
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          image: imagePath,
        });
      };
      getApi();
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="search-btn" onClick={handleClick()}>
            Search
          </button>
        </div>
        <img src={data.image} alt="" className="weather-img" />
        <div className="winfo">
          <h2>{Math.round(data.celcius)}°c</h2>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <WiHumidity className="humidity-icons" />
              <div className="humidity-desc">
                <p>{Math.round(data.humidity)}%</p>
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
