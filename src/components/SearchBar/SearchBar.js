import React, { useState } from "react";
import "./searchBar.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import ReactFlagsSelect from "react-flags-select";

export const SearchBar = ({ findCoordinates, unit, setUnit }) => {
  const [countryCode, setCountryCode] = useState("RS");
  const [city, setCity] = useState("");

  const countries = require("@datasets/country-list");

  return (
    <div className="search-bar">
      <TiWeatherPartlySunny className="cloud-icon" size={80} />
      {/* <select
        className="select-country"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        {countries.getCodes().map((code) => {
          return <option>{code}</option>;
        })}
      </select> */}

      <ReactFlagsSelect
        className="select-country-flags"
        searchable
        searchPlaceholder="Search countries..."
        selected={countryCode}
        onSelect={(code) => setCountryCode(code)}
      />

      <div className="input-group d-flex flex-row">
        <input
          className="input-city"
          placeholder="Please enter your location..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              findCoordinates(countryCode, city);
            }
          }}
        />
        <div className="input-group-prepend">
          <BiSearchAlt2
            size={25}
            onClick={() => findCoordinates(countryCode, city)}
          />
        </div>
      </div>
      <select
        className="select-unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
      </select>
    </div>
  );
};
