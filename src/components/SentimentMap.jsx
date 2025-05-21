import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
//Optional if we need BG with world map
// import am5geodata_world from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_usa from "@amcharts/amcharts5-geodata/usaLow";
import am5geodata_canada from "@amcharts/amcharts5-geodata/canadaLow";
import am5geodata_australia from "@amcharts/amcharts5-geodata/australiaLow";
import am5geodata_germany from "@amcharts/amcharts5-geodata/germanyLow";
import am5geodata_france from "@amcharts/amcharts5-geodata/franceLow";
import am5geodata_Japan from "@amcharts/amcharts5-geodata/JapanLow";
import am5geodata_China from "@amcharts/amcharts5-geodata/ChinaLow";
import am5geodata_India from "@amcharts/amcharts5-geodata/IndiaLow";
import am5geodata_Brazil from "@amcharts/amcharts5-geodata/BrazilLow";
import am5geodata_uk from "@amcharts/amcharts5-geodata/ukLow";
import am5geodata_Mexico from "@amcharts/amcharts5-geodata/mexicoLow";
import am5geodata_Russia from "@amcharts/amcharts5-geodata/russiaLow";

const sentimentColors = {
  0: am5.color(0xff5252), // negative - red
  1: am5.color(0xffeb3b), // neutral - yellow
  2: am5.color(0x4caf50), // positive - green
};

// To-Do load more Geo data
const countryGeodataMap = {
  "United States": am5geodata_usa,
  Canada: am5geodata_canada,
  Australia: am5geodata_australia,
  Germany: am5geodata_germany,
  France: am5geodata_france,
  Japan: am5geodata_Japan,
  China: am5geodata_China,
  India: am5geodata_India,
  Brazil: am5geodata_Brazil,
  Mexico: am5geodata_Mexico,
  Russia: am5geodata_Russia,
  "United Kingdom": am5geodata_uk,
};

const getSentimentText = (value) => {
  switch (value) {
    case 2:
      return "Sentiment: Positive";
    case 1:
      return "Sentiment: Neutral";
    case 0:
      return "Sentiment: Negative";
    default:
      return "No Data";
  }
};

const SentimentMap = ({ geoData, onclick }) => {
  const chartRef = useRef(null);
  const idRef = useRef(`chartdiv-${Math.random().toString(36).substr(2, 9)}`);

  const geoDataLookup = React.useMemo(() => {
    const map = new Map();
    geoData.forEach(({ Country, Region, value }) => {
      if (!map.has(Country)) map.set(Country, new Map());
      map.get(Country).set(Region, { value });
    });
    return map;
  }, [geoData]);

  useLayoutEffect(() => {
    const root = am5.Root.new(idRef.current);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    const seriesMap = new Map();

    Object.entries(countryGeodataMap).forEach(([countryName, geodata]) => {
      const series = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: geodata,
          fillOpacity: 0.8,
          stroke: am5.color(0x000000),
          strokeWidth: 0.5,
          cursorOverStyle: "pointer",
          toggleKey: "active",
          toggleable: true,
        })
      );

      series.mapPolygons.template.events.on("click", (ev) => {
        performance.mark("map-click-start");
        const data = ev.target?.dataItem?.dataContext;
        const countryData = geoData.filter((d) => d.Country === countryName);
        const regionData = countryData.find((d) => d.Region === data?.name);
        onclick(regionData, countryData);
      });

      series.mapPolygons.template.adapters.add("fill", (_, target) => {
        const regionName = target.dataItem.dataContext.name;
        const dataItem = geoDataLookup.get(countryName)?.get(regionName);
        return dataItem ? sentimentColors[dataItem.value] : null;
      });

      series.mapPolygons.template.adapters.add("tooltipText", (_, target) => {
        const data = target.dataItem?.dataContext;
        const regionName = data?.name || "Unknown Region";
        const dataItem = geoDataLookup.get(countryName)?.get(regionName);
        return `${regionName}\n${getSentimentText(dataItem?.value)}`;
      });

      seriesMap.set(countryName, series);
    });

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [geoDataLookup, onclick, geoData]);

  return (
    <div id={idRef.current} style={{ width: "100%", height: "500px" }}></div>
  );
};

export default SentimentMap;
