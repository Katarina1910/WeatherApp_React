import "./temperature.css";

export const Temperature = ({ title, temperature, size, unit }) => {
  return (
    <div className="temperature">
      <div className="title">{title}</div>
      <div className="body" style={{ fontSize: size }}>
        <p>
          <var>
            {Math.round(temperature * 10) / 10}
            <sup>&deg;{unit === "metric" ? "C" : "F"}</sup>
          </var>
        </p>
      </div>
    </div>
  );
};
