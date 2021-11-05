import "./App.css";
import { MainContext } from "./context/authContext";
/*json */
/*Components*/
import Main from "./components/Main";

function App() {

  const api = {
    token :"33e965c0053ca2b54fb3424bb1cbd4ca",
  }
  const citiesUrl  = "https://countriesnow.space/api/v0.1/countries/population/cities";
  const data = {
    api,
    citiesUrl
  };

  return (
    <MainContext.Provider value={data}>
      <Main />
    </MainContext.Provider>
  );
}

export default App;
