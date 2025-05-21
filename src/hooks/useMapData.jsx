import { useMemo } from "react";
import { geoData } from "../data/input"; // Adjust the import path as needed



export function useMapData(filters) {

    const uniqueCountries = useMemo(() => {
    const countriesSet = new Set();
    countriesSet.add('All')
    geoData.forEach(item => countriesSet.add(item.Country));

    return Array.from(countriesSet);
  }, []);

  const uniqueRegions = useMemo(() => {
    const regionsSet = new Set();
    geoData.forEach(item => regionsSet.add(item.Region));
    return Array.from(regionsSet);
  }, []);

  const filteredData =  useMemo(() => {
    return geoData.filter((item) => {
      const matchesCountry = filters.country !=='All' ? item.Country === filters.country : true;
      const matchesValue =
        filters.value !== 'all'
            ? item.value === Number(filters.value)
          : true;

      return matchesCountry && matchesValue;
    });
  }, [filters]);
  return { filteredData, uniqueCountries, uniqueRegions };
}