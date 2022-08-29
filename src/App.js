import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Temperature } from "./components/Temperature/Temperature";
import { useEffect, useState } from "react";
import * as weatherService from "./services/weatherService";

function App() {
  const [fiveDaysTemperature, setFiveDaysTemperature] = useState([]);
  const [weekTemperature, setWeekTemperature] = useState([]);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    setFiveDaysTemperature([]);
    setWeekTemperature([]);
  }, [unit]);

  const findCoordinates = (countryCode, city) => {
    if (city === "") {
      alert("Please, enter city");
      return;
    }
    weatherService
      .findCoordinates(countryCode, city)
      .then((response) => {
        if (response.data.length === 0) alert("No found results!");
        else getTemperatureFiveDays(response.data[0].lat, response.data[0].lon);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getTemperatureFiveDays = (lat, lon) => {
    weatherService
      .getTemperatureFiveDays(lat, lon, unit)
      .then((response) => {
        setFiveDaysTemperature(response.data.list);
        calculateAverageTempeatureForFiveDays(response.data.list);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const calculateAverageTempeatureForFiveDays = (listTemperatures) => {
    let array = [];
    let previousEntry = "";
    let sum = 0;
    let count = 0;

    listTemperatures.forEach((entry) => {
      if (entry.dt_txt.split(" ")[0] === previousEntry) {
        sum = sum + entry.main.temp;
        count++;
        previousEntry = entry.dt_txt.split(" ")[0];
      } else {
        if (previousEntry !== "") {
          array.push({ date: previousEntry, average: sum / count });
          sum = 0;
          count = 0;
        }
        sum = sum + entry.main.temp;
        count++;
        previousEntry = entry.dt_txt.split(" ")[0];
      }
    });

    setWeekTemperature(array);
  };

  const calculateAverageTempeature = () => {
    let sumTemp = 0;

    fiveDaysTemperature.forEach((wt) => {
      sumTemp = sumTemp + wt.main.temp;
    });

    return (sumTemp / fiveDaysTemperature.length).toString();
  };

  const getDateRange = () => {
    let dateFrom = new Date(fiveDaysTemperature[0].dt_txt);
    let dateTo = new Date(
      fiveDaysTemperature[fiveDaysTemperature.length - 1].dt_txt
    );

    return (
      dateFrom.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " - " +
      dateTo.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg, rgb(16, 56, 134),rgb(153, 219, 254), rgb(254, 109, 22))",
        height: "100vh",
        width: "100vw",
      }}
    >
      <SearchBar
        findCoordinates={findCoordinates}
        unit={unit}
        setUnit={setUnit}
      />
      {fiveDaysTemperature.length > 0 && (
        <Temperature
          title={getDateRange()}
          temperature={calculateAverageTempeature()}
          size={70}
          unit={unit}
        />
      )}
      {weekTemperature.length > 0 && (
        <div className="week-temperature">
          {weekTemperature.map((wt) => {
            return (
              <Temperature
                title={new Date(wt.date).toLocaleDateString("en", {
                  weekday: "long",
                })}
                temperature={wt.average}
                size={30}
                unit={unit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
