import React, { useEffect, useRef, useState } from "react";
import { MainContext, useContext } from "../context/authContext";
/*CSS İMPORT*/
import style from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
  const weatherTypes = {
    Clouds:
      "https://cdn5.vectorstock.com/i/1000x1000/26/99/paper-clouds-and-blue-sky-background-vector-21352699.jpg",
    Rain: "https://wallpaperboat.com/wp-content/uploads/2021/03/16/71409/rain-minimalist-04.jpg",
    Mist: "https://img.freepik.com/free-vector/minimalist-vector-illustration-skyscrapers-clouds-city-highrises-misty-fog_93208-972.jpg?size=626&ext=jpg",
    Clear:
      "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWluaW1hbCUyMHNreXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    Haze: "https://cdn2.vectorstock.com/i/1000x1000/21/11/sea-haze-black-glyph-icon-vector-31012111.jpg",
    Fog: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ux95v6pYWfPvkvcGUy7YGQTkVCKb4p5-gQ&usqp=CAU",
    Sand: "https://toppng.com/uploads/preview/desert-dune-sand-vector-art-minimalism-115699249173y8gngdddw.jpg",
    Snow: "https://cdn5.vectorstock.com/i/thumb-large/38/79/winter-horizontal-landscape-vector-23613879.jpg",
    Dust: "https://static.vecteezy.com/system/resources/thumbnails/000/193/987/small/5-10.jpg",
    Thunderstorm:
      "https://www.nps.gov/neri/planyourvisit/images/web_lightning_square.jpg?maxwidth=650&autorotate=false",
    Smoke:
      "https://i.pinimg.com/originals/5e/91/3d/5e913d22fd5ffb5287db626c5255685c.jpg",
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var date = new Date();
  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();
  var monthString = monthNames[date.getMonth()];

  var formattedDate = `${day}, ${monthString} ${month}, ${year}`;

  const city = useRef();
  const { api } = useContext(MainContext);
  const [curCity, SetCurCity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("İstanbul");

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  const handleClick = (value) => () => {
    setError();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          SetCurCity({
            name: data.name,
            date: formattedDate,
            degree: (Number(data.main.temp) - 273.15).toFixed(0),
            statusmain: data.weather[0].main,
            status:
              data.weather[0].main.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1),
            max: (Number(data.main.temp_max) - 273.15).toFixed(0),
            min: (Number(data.main.temp_min) - 273.15).toFixed(0),
          });
        } else {
          setError(data.message);
        }
      });
  };

  const autoCompleteCities = () => {
    setCityName(city.current.value);
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=İstanbul&appid=${api.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setIsLoading(false);
          SetCurCity({
            name: data.name,
            date: formattedDate,
            degree: (Number(data.main.temp) - 273.15).toFixed(0),
            statusmain: data.weather[0].main,
            status:
              data.weather[0].main.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1),
            max: (Number(data.main.temp_max) - 273.15).toFixed(0),
            min: (Number(data.main.temp_min) - 273.15).toFixed(0),
          });
        }
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <div
          className={`${style["card-wrapper"]} shadow-lg`}
          style={{
            backgroundImage: `url(${weatherTypes[`${curCity.statusmain}`]})`,
          }}
        >
          {isLoading ? (
            <img
              className={`${style.loading} m-0`}
              alt=""
              src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            />
          ) : (
            <div className={`d-flex justify-content-center align-items-center flex-column`}>
              <div className={`${style.header} mb-5 text-center`}>
                <a
                  href="https://github.com/metehankasapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/metehankasapp
                </a>
              </div>
              <div className={`${style["search-ctr"]}`}>
                <input
                  type="text"
                  ref={city}
                  onChange={autoCompleteCities}
                  placeholder="City"
                />
                <button onClick={handleClick(cityName)}>Search</button>
              </div>
              {error && (
                <p className={`${style.errormsg} m-0 text-danger`}>{error}</p>
              )}
              <div className="h-100 d-flex align-items-center justify-content-baseline flex-column">
                <div
                  className={`${style["card-inner"]} d-flex justify-content-center align-items-center flex-column`}
                >
                  <h4 className={`${style["city-header"]}`}>{curCity.name}</h4>
                  <span className={style.date}>{curCity.date}</span>
                  <span className={style.degree}>
                    {curCity.degree}&#176;
                    <span className={`${style.degreec}`}>c</span>
                  </span>
                  <span className={style.hrr}>--------------</span>
                  <span className={style.status}>{curCity.status}</span>
                  <p className={style.maxmin}>
                    <span className={style.max}>{curCity.max}&#176;c</span>
                    <span className="mx-2">/</span>
                    <span className={style.min}>{curCity.min}&#176;c</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
