import React from "react";
import "./App.css";
import  {TemperatureChart}  from "./TemperatureChart";

function App() {
  const temperatureData = [
    { date: "2023-08-25", temperature: 68 },
    { date: "2023-08-26", temperature: 67 },
    { date: "2023-08-27", temperature: 79 },
    { date: "2023-08-28", temperature: 78 },
    { date: "2023-08-29", temperature: 77 },
    { date: "2023-08-30", temperature: 65 },
    { date: "2023-08-31", temperature: 64 },
    { date: "2023-09-01", temperature: 72 },
    { date: "2023-09-02", temperature: 74 },
    { date: "2023-09-03", temperature: 75 },
    { date: "2023-09-04", temperature: 73 },
    { date: "2023-09-05", temperature: 71 },
    { date: "2023-09-06", temperature: 69 },
  ];

  return <TemperatureChart data={temperatureData} />;
}

export default App;
