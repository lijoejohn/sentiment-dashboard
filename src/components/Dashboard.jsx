import React, { useState, Suspense, useCallback } from "react";
import { useMapData } from "../hooks/useMapData";

const SentimentMap = React.lazy(() => import("./SentimentMap"));
import { SummaryTable } from "./SummaryTable";
import { SentimentButtons } from "./SentimentButtons";

const Dashboard = () => {
  const [sentiment, setSentiment] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCountryData, setSelectedCountryData] = useState([]);

  const { filteredData, uniqueCountries } = useMapData({
    country: selectedCountry,
    value: sentiment,
  });

  const handleCountryChange = useCallback((e) => {
    setSelectedCountry(e.target.value);
  }, []);

  const clickHandler = useCallback((_, country) => {
    setSelectedCountryData(country);
  }, []);

  return (
    <div className="dashboard w-full">
      <header className="dashboard-header">
        <h1>Global Sentiment Analysis</h1>

        <SentimentButtons selected={sentiment} onChange={setSentiment} />

        <div className="mt-4">
          <label htmlFor="country-select" className="block mb-1 font-semibold">
            Country
          </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 max-w-md"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="map-container">
        <div className="flex h-screen">
          {/* Map container */}
          <div className="flex-1 bg-gray-100">
            <div className="h-full flex items-center justify-center text-gray-500">
              <Suspense
                fallback={
                  <div className="h-[500px] w-full flex items-center justify-center">
                    Loading chart...
                  </div>
                }
              >
                <SentimentMap geoData={filteredData} onclick={clickHandler} />
              </Suspense>
            </div>
          </div>

          {/* Side panel */}
          <div className="w-80 bg-white border-l border-gray-300 p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <SummaryTable data={selectedCountryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
