import React, {
  useRef,
  useState
} from "react";
import {
  MainContext,
  useContext
} from "../context/authContext";
/*CSS İMPORT*/
import style from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
    const city = useRef();
    const {
      api,
      citiesUrl
    } = useContext(MainContext);
    const [cityList, setCityList] = useState([]);

    const useCityWeather = () => {
      fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.current.value}&appid=${api.token}`
        )
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    const useCities = () => {
      fetch(`${citiesUrl}`)
        .then((response) => response.json())
        .then((cities) => setCityList(cities.data))
    };

    return ( <
        div className = {
          `d-flex justify-content-center align-items-center flex-column ${style["app-container"]}`
        } >
        <
        div className = "card" > < /div> <
        input type = "text"
        ref = {
          city
        }
        onChange = {
          useCities
        }
        /> <
        button onClick = {
          useCityWeather
        } > Get Data < /button> {
          !cityList.length !== 0 &&
            cityList
            .filter((data) => data.city.includes(`${city.current.value}`))
            .map((item) => < div > {
                item.city
              } < /div>)} <
              /div>
            );
        };

        export default Main;

        const DUMMY_WEATHER = {};