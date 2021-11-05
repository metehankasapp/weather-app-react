import React, { useRef, useState } from "react";
import { MainContext, useContext } from "../context/authContext";
/*CSS İMPORT*/
import style from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
  const weatherTypes = {
    Clouds: "https://wallpaperaccess.com/full/1216313.jpg",
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
  const [cityList, setCityList] = useState([]);
  const [curCity, SetCurCity] = useState({
    name: "Harlem",
    date: formattedDate,
    degree: "55",
    status: "Cloudy",
    max: "28",
    min: "30",
  });

  /* const useCities = () => {
    fetch(`${citiesUrl}`)
      .then((response) => response.json())
      .then((cities) => setCityList(cities.data));
  }; */

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  const autoCompleteCities = () =>
    fetch(
      `https://spott.p.rapidapi.com/places/autocomplete?limit=100&skip=0&q=${city.current.value}&type=CITY`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "spott.p.rapidapi.com",
          "x-rapidapi-key":
            "8e11a311dbmsh8ae6dc7fc1a64e7p1d39dajsnd34f31891721",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCityList(data))
      .catch((err) => {
        console.error(err);
      });

  const handleClick = (value) => () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api.token}`
    )
      .then((response) => response.json())
      .then((data) =>


        {console.log(data.cod);
          if(data.cod === 200){
            SetCurCity({
              name: data.name,
              date: formattedDate,
              degree: (Number(data.main.temp) - 273.15).toFixed(0),
              statusmain:data.weather[0].main,
              status:
                data.weather[0].main.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1),
              max: (Number(data.main.temp_max) - 273.15).toFixed(0),
              min: (Number(data.main.temp_min) - 273.15).toFixed(0),
            })
        }else{
          console.log(data.message) /*ERROR MESSAGE OLUŞTUR*/
        }}
        
      );
  };

  
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div
        className={`d-flex justify-content-center align-items-center flex-column ${style["app-container"]}`}
      >
        <div className="card"> </div>{" "}
        <input type="text" ref={city} onChange={autoCompleteCities} />
        {!cityList.length !== 0 &&
          cityList
            .filter((data) => data.name.includes(`${city.current.value}`))
            .map((item, index) => (
              <button onClick={handleClick(item.name)} key={index}>
                {item.name}
              </button>
            ))}
        <div
          className={`${style["card-wrapper"]} shadow-lg`}
          style={{ backgroundImage: `url(${weatherTypes[`${curCity.statusmain}`]})` }}
        >
          <div className="header mb-5 text-center">
            <a href="https://github.com/metehankasapp" target="_blank" rel="noreferrer">https://github.com/metehankasapp</a>
          </div>
          <div className="h-100 d-flex align-items-baseline justify-content-center">
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
      </div>
    </div>
  );
};

export default Main;
