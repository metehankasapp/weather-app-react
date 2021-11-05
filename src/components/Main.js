import React, { useRef, useState } from "react";
import { MainContext, useContext } from "../context/authContext";
/*CSS İMPORT*/
import style from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
  const city = useRef();
  const { api } = useContext(MainContext);
  const [cityList, setCityList] = useState([]);

  /* const useCities = () => {
    fetch(`${citiesUrl}`)
      .then((response) => response.json())
      .then((cities) => setCityList(cities.data));
  }; */

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
      .then((data) => console.log(data));
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
      </div>
      <div className={`${style["card-wrapper"]} shadow-lg`}>
        <div className="header mb-5 text-center">
          <span>https://github.com/metehankasapp</span>
        </div>
        <div className="h-100 d-flex align-items-baseline justify-content-center">
          <div
            className={`${style["card-inner"]} d-flex justify-content-center align-items-center flex-column`}
          >
            <h4 className={`${style["city-header"]}`}>Harlem</h4>
            <span className={style.date}>Tuesday, January 10, 2019</span>
            <span className={style.degree}>15&#176;<span className={`${style.degreec}`}>c</span></span>
            <span className={style.hrr}>--------------</span>
            <span className={style.status}>Cloudy</span>
            <p className={style.maxmin}>
              <span>25&#176;c</span>
              <span className="mx-2">/</span>
              <span>28&#176;c</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

const DUMMY_WEATHER = {};
