import "../css/style.css";
const Home = () => {
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" />
          <button className="search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
